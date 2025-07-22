import { type SchemaTypeDefinition } from 'sanity'
import songSchema from './song'
import controllerSchema from './controller'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    songSchema,
    controllerSchema
  ],
}
