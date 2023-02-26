import type { Question } from "@/types/index";

export async function getQuestions(
  difficulty: string,
  token: string
): Promise<Question[]> {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&token=${token}`
  );
  const { results } = await response.json();

  return results;
}

export async function getToken() {
  const response = await fetch(
    "https://opentdb.com/api_token.php?command=request"
  );
  const { token } = await response.json();

  return token;
}
