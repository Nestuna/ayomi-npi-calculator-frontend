export interface Expression {
  expression_text: string;
}

export interface Calculation {
  id: number
  expression: string
  result: number
}
