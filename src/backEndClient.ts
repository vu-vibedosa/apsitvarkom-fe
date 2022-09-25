import axios from "axios";
import { ExampleModel } from "./components/Example";

const getExample = () => {
  return axios.get<ExampleModel>("/api/Example");
};

export default getExample;
