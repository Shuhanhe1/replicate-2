import { typesense } from 'src/common/setups';

const productsSchema = {
  name: 'products',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'title', type: 'string' },
  ],
  default_sorting_field: 'name',
};

typesense
  .collections()
  // @ts-ignore
  .create(productsSchema)
  .then(function (data) {
    console.log(data);
  });
