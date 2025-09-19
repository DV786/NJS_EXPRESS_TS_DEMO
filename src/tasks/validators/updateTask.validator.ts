import { checkSchema } from "express-validator";

export const updateTaskValidator = checkSchema({
  _id: {
    in: ['body'],
    notEmpty: true,
    isMongoId: true,
    errorMessage: 'Valid Document Id Provide'
  },
  title: {
    in: ["body"], // query
    optional: true,
    errorMessage: "title is required",
    isString: true,
    isLength: {
      options: { max: 100 },
      errorMessage: 'Title should atleast be 100 chars'
    },
    trim: true
  },
  description: {
    in: ["body"],
    optional: true,
    isString: true,
    trim: true
  },
  status: {
    in: ['body'],
    optional: true,
    isIn: {
      options: [['todo', 'inProgress', 'completed']]
    }
  },
  priority: {
    in: ['body'],
    optional: true,
    isIn: {
      options: [['low', 'normal', 'high']]
    }
  },
  dueDate: {
    in: ['body'],
    optional: true,
    isISO8601: true
  }
})