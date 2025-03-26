import { SearchUserInputEnum } from "@repo/enums";

export type SearchUserInputType = keyof typeof SearchUserInputEnum;
export const SearchUserInputValues = Object.values(SearchUserInputEnum);
