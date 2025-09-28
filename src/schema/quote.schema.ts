import J from 'joi';

type CreateQuoteSchemaType = {
  quote: string;
  author: string;
};

const MAX_LENGHT_OF_AUTHOR = 50;

const createQuoteSchema = J.object<CreateQuoteSchemaType>({
  quote: J.string().trim().required(),
  author: J.string().trim().required().max(MAX_LENGHT_OF_AUTHOR),
}).required();

export { createQuoteSchema };
