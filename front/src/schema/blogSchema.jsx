import * as yup from 'yup';

export const blogschema = yup
  .object()
  .shape({
    header: yup.string().required("Header is a required field"),
    desc: yup.string().required("Description is a required field"),
    img: yup.string().required("Image is a required field"),
    category1: yup.string().required("Category 1 is a required field"),
    category2: yup.string().required("Category 2 is a required field"),
    category3: yup.string().required("Category 3 is a required field"),
    category4: yup.string().required("Category 4 is a required field"),
    user: yup.string().required("User is a required field")
  })