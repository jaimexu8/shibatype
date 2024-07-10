import { CreateUserData } from "../../interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";
import CreateTestData from "../../interfaces/test.interface";

export const defaultTestPrompt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pellentesque congue libero, nec finibus libero pharetra eu. Vivamus sit amet blandit mauris. Aliquam fermentum tellus quis auctor elementum. Maecenas ipsum ex, suscipit non viverra ac, egestas vitae nisl. Maecenas tellus neque, sagittis quis tempor sed, blandit dignissim justo. Aliquam dapibus sodales arcu, sed mollis risus ullamcorper vitae. Vivamus accumsan neque id fermentum ornare. Sed lorem massa, tincidunt dignissim pulvinar ut, gravida sit amet purus. Curabitur tincidunt aliquam est, quis laoreet ante condimentum pulvinar. Fusce auctor tincidunt ipsum in elementum. Duis ullamcorper dui leo, vitae condimentum metus varius nec. Nulla nulla justo, efficitur ut sollicitudin vitae, vehicula quis nisi.";

export function defaultCreateTestData(firebaseID: string): CreateTestData {
  return {
    firebaseID,
    prompt: defaultTestPrompt,
    wordsTyped: findTotalWords(defaultTestPrompt),
    wordMistakes: 4,
    charsTyped: defaultTestPrompt.length,
    charMistakes: 5,
    seconds: 40,
  };
}

export const defaultUserData: CreateUserData = {
  firebaseID: uuidv4(),
  displayName: "user123",
  email: "user123@gmail.com",
};

export function findTotalWords(prompt: string) {
  return prompt.split(" ").length;
}
