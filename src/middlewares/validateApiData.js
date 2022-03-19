import * as validateDataService from "../services/validateDataService.js";

const validateId = (req, res, next) => {
  const id = req.params.id;
  const validated = validateDataService.validateId(id);
  if (validated && !validated.error) next();
  else {
    res.status(400).json({ error: validated.error });
  }
};

const validatePostBody = (req, res, next) => {
  let { title, price, thumbnail } = req.body;
  const validated = validateDataService.validatePostBody(
    title,
    price,
    thumbnail
  );
  if (validated && !validated.error) {
    req.body = { ...req.body, ...validated };
    next();
  } else {
    res.status(400).json({ error: validated.error });
  }
};

const validatePutBody = (req, res, next) => {
  let { title, price, thumbnail } = req.body;
  const validated = validateDataService.validatePutBody(
    title,
    price,
    thumbnail
  );
  if (validated && !validated.error) {
    req.body = { ...req.body, ...validated };
    next();
  } else {
    res.status(400).json({ error: validated.error });
  }
};

export { validateId, validatePostBody, validatePutBody };
