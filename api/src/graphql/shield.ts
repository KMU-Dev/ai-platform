import { shield } from "graphql-shield"
import { merge } from "lodash"
import { userValidations } from "../user"

export const validations = shield(merge(userValidations));


