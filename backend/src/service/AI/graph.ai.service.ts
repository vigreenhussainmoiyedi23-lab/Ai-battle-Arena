import {
  StateSchema,
  MessagesValue,
  type GraphNode,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";
import * as z from "zod";
import { cohereModel, geminiModel, mistralModel } from "./AiModels.service.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createAgent, providerStrategy } from "langchain";
const State = new StateSchema({
  messages: MessagesValue,
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judgement: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    recommendation: z.string().default(""),
  }),
});
const judge = createAgent({
  tools: [],
  model: geminiModel,
  responseFormat: providerStrategy(
    z.object({
      solution_1_score: z.number(),
      solution_2_score: z.number(),
      recommendation: z.string(),
    }),
  ),
});
function getText(content: string | unknown[]): string {
  if (typeof content === "string") {
    return content;
  }

  return JSON.stringify(content);
}
const solutionNode: GraphNode<typeof State> = async (state) => {
  console.time("solution");
  const [res1, res2] = await Promise.all([
    cohereModel.invoke(state.messages),
    mistralModel.invoke(state.messages),
  ]);
  console.timeEnd("solution");
  return {
    messages: state.messages,
    solution_1: getText(res1.content),
    solution_2: getText(res2.content),
  };
};
const judgeNode: GraphNode<typeof State> = async (state) => {
  try {
    const response = await judge.invoke({
      messages: [
        new SystemMessage(
          `You are an impartial AI judge.

Compare the two solutions.

Score each solution from 1 to 10.

Return ONLY valid JSON.

Do not include explanations.
Do not wrap the JSON in markdown.
Do not output any text before or after the JSON.

The JSON schema is:

{
  "solution_1_score": number,
  "solution_2_score": number,
  "recommendation": "solution_1" | "solution_2" | "tie",
}`,
        ),
        new HumanMessage(`
        Solution 1:
        ${state.solution_1}
        
        Solution 2:
        ${state.solution_2}
        `),
      ],
    });
    console.dir(response, { depth: null });
    const lastMessage = response.messages.at(-1);

    const fallback = {
      solution_1_score: 10,
      solution_2_score: 10,
      recommendation: "tie",
    };

    if (!lastMessage || typeof lastMessage.content !== "string") {
      return { judgement: fallback };
    }

    const judgement = JSON.parse(lastMessage.content);

    return { judgement };
  } catch (error) {
    return {
      judgement: {
        solution_1_score: 10,
        solution_2_score: 10,
        recommendation: "tie",
      },
    };
  }
};

const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

export default graph;
