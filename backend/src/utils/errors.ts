type Fields = Record<string, string>

export class FieldError extends Error {
  fields: Fields

  constructor(message: string, fields: Fields) {
    super(message)
    this.name = 'FieldError'
    this.fields = fields
  }
}
