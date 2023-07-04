import * as yup from 'yup';

export const schema = yup
  .object()
  .shape({
    img: yup.string().required("Image is a required field"),
    header: yup.string().required("Header is a required field"),
    desc: yup.string().required("Description is a required field"),
  })