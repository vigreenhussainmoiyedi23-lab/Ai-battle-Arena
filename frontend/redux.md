| Function / Method    | Comes From          | Purpose                                                  | Returns / Creates | When You'll Use It                                            |
| -------------------- | ------------------- | -------------------------------------------------------- | ----------------- | ------------------------------------------------------------- |
| `configureStore()`   | `@reduxjs/toolkit`  | Creates the Redux store and combines all slices.         | Redux Store       | Once in `store.ts`                                            |
| `createSlice()`      | `@reduxjs/toolkit`  | Creates a slice containing state, reducers, and actions. | Slice object      | Once per feature (`auth`, `chat`, etc.)                       |
| `createAsyncThunk()` | `@reduxjs/toolkit`  | Creates async actions for API calls.                     | Async thunk       | When working with async logic (optional if using React Query) |
| `PayloadAction<T>`   | `@reduxjs/toolkit`  | Types the payload of an action.                          | Type              | Inside reducers                                               |
| `useSelector()`      | `react-redux`       | Reads data from the Redux store.                         | Selected state    | Inside React components                                       |
| `useDispatch()`      | `react-redux`       | Sends actions to Redux.                                  | Dispatch function | Inside React components                                       |
| `useAppSelector()`   | Your `app/hooks.ts` | Typed version of `useSelector`.                          | Selected state    | Use everywhere instead of `useSelector`                       |
| `useAppDispatch()`   | Your `app/hooks.ts` | Typed version of `useDispatch`.                          | Dispatch function | Use everywhere instead of `useDispatch`                       |
| `Provider`           | `react-redux`       | Makes the Redux store available to the entire React app. | React Provider    | Once in `main.tsx`                                            |
