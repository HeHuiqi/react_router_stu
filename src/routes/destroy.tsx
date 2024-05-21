import { UNSAFE_ErrorResponseImpl, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }: any) {

    if (params == null) {
        //模拟抛出一个错误，回重定向到错误页
        throw new UNSAFE_ErrorResponseImpl(404, "oh dang!", "oh dang!")
    }
    await deleteContact(params.contactId);
    return redirect("/");
}