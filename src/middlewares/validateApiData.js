import * as validateDataService from "../services/validateDataService.js";

const validateId = (req, res, next) => {
  const id = req.params.id;
  const validated = validateDataService.validateId(id);
  if (validated && !validated.error) next();
  else {
    res.status(400).json({ error: validated.error });
  }
};

const validatePostProductBody = (req, res, next) => {
  const data = req.body;
  const validated = validateDataService.validatePostProductBody(data);
  if (validated && !validated.error) {
    req.body = { ...validated };
    next();
  } else {
    res.status(400).json({ error: validated.error });
  }
};

const validatePutProductBody = (req, res, next) => {
  const data = req.body;
  const validated = validateDataService.validatePutProductBody(data);
  if (validated && !validated.error) {
    req.body = { ...validated };
    next();
  } else {
    res.status(400).json({ error: validated.error });
  }
};

export { validateId, validatePostProductBody, validatePutProductBody };
