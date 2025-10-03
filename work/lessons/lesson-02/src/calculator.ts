export interface CalculatorResult {
  result?: number;
  error?: string;
}

export class Calculator {
  private tokens: string[];
  private position: number;

  constructor() {
    this.tokens = [];
    this.position = 0;
  }

  /**
   * Calculate the result of a mathematical expression
   * @param tokens Array of tokens (numbers, operators, parentheses)
   * @returns CalculatorResult with either result or error
   */
  calculate(tokens: string[]): CalculatorResult {
    this.tokens = tokens;
    this.position = 0;

    try {
      if (tokens.length === 0) {
        return { error: "Empty expression" };
      }

      const result = this.parseExpression();
      
      if (this.position < this.tokens.length) {
        return { error: `Unexpected token: ${this.tokens[this.position]}` };
      }

      return { result };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Unknown error" };
    }
  }

  /**
   * Parse expression: term (('+' | '-') term)*
   */
  private parseExpression(): number {
    let result = this.parseTerm();

    while (this.position < this.tokens.length) {
      const operator = this.tokens[this.position];
      
      if (operator === '+') {
        this.position++;
        result += this.parseTerm();
      } else if (operator === '-') {
        this.position++;
        result -= this.parseTerm();
      } else {
        break;
      }
    }

    return result;
  }

  /**
   * Parse term: factor (('*' | '/') factor)*
   */
  private parseTerm(): number {
    let result = this.parseFactor();

    while (this.position < this.tokens.length) {
      const operator = this.tokens[this.position];
      
      if (operator === '*') {
        this.position++;
        result *= this.parseFactor();
      } else if (operator === '/') {
        this.position++;
        const divisor = this.parseFactor();
        if (divisor === 0) {
          throw new Error("Division by zero");
        }
        result /= divisor;
      } else {
        break;
      }
    }

    return result;
  }

  /**
   * Parse factor: number | '(' expression ')' | '-' factor | '+' factor
   */
  private parseFactor(): number {
    if (this.position >= this.tokens.length) {
      throw new Error("Unexpected end of expression");
    }

    const token = this.tokens[this.position];

    // Handle unary minus
    if (token === '-') {
      this.position++;
      return -this.parseFactor();
    }

    // Handle unary plus
    if (token === '+') {
      this.position++;
      return this.parseFactor();
    }

    // Handle parentheses
    if (token === '(') {
      this.position++;
      const result = this.parseExpression();
      
      if (this.position >= this.tokens.length || this.tokens[this.position] !== ')') {
        throw new Error("Missing closing parenthesis");
      }
      
      this.position++;
      return result;
    }

    // Handle numbers
    if (this.isNumber(token)) {
      this.position++;
      return parseFloat(token);
    }

    throw new Error(`Invalid token: ${token}`);
  }

  /**
   * Check if a token is a valid number
   */
  private isNumber(token: string): boolean {
    return !isNaN(parseFloat(token)) && isFinite(parseFloat(token));
  }
}