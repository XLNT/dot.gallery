import { RouteComponentProps, __RouterContext } from "react-router-dom";
import { useContext } from "react";

export default function useRouter<TParams = {}>() {
  return useContext(__RouterContext) as RouteComponentProps<TParams>;
}
