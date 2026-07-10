import {
  StateGraph,
  StateSchema,
  MessagesValue,
  ReducedValue,
  type GraphNode,
  START,
  END,
} from "@langchain/langgraph";
import { z } from "zod/v4";
import { cohereModel, geminiModel, mistralModel } from "./AI.model.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
const JudgeSchema = z.object({
  solution1Score: z.number().default(0),
  solution2Score: z.number().default(0),
  recommendation: z.enum(["solution1", "solution2", "tie"]),
});
const AIBATTLESTATE = new StateSchema({
  messages: MessagesValue,
  solution1: z.string().default(""),
  solution2: z.string().default(""),
  judgement: z.object({
    solution1Score: z.number().default(0),
    solution2Score: z.number().default(0),
    recommendation: z.string().default("tie"),
  }),
});

const solutionNode: GraphNode<typeof AIBATTLESTATE> = async function (state) {
  try {
    console.time("solution");
    const [res1, res2] = await Promise.all([
      mistralModel.invoke(state.messages),
      cohereModel.invoke(state.messages),
    ]);
    console.timeEnd("solution");
    return {
      ...state,
      solution1:
        typeof res1.content === "string"
          ? res1.content
          : res1.content.map((b) => ("text" in b ? b.text : "")).join(""),
      solution2:
        typeof res2.content === "string"
          ? res2.content
          : res2.content.map((b) => ("text" in b ? b.text : "")).join(""), // use ai as i dont even know what is this
    };
  } catch (error) {
    console.log(error);
    return state;
  }
};
const judgenNode: GraphNode<typeof AIBATTLESTATE> = async function (state) {
  try {
    console.time("judgement");
    const structuredModel = geminiModel.withStructuredOutput(JudgeSchema);
    const prompt: string = `
Solution 1:
${state.solution1}

Solution 2:
${state.solution2}

Judge these solutions.
`;

    console.log("Judge prompt chars:", prompt.length);
    const judgement = await structuredModel.invoke([new HumanMessage(prompt)]);
    console.timeEnd("judgement");
    return {
      judgement,
    };
  } catch (error) {
    console.log(error);

    return state;
  }
};

const graph = new StateGraph(AIBATTLESTATE)
  .addNode("solution", solutionNode)
  .addNode("judge", judgenNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

export default graph;
