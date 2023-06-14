import sanitize from 'mongo-sanitize';

function sanitizeInput (req,res,next) {
  if(req.body){
    for(const prop in req.body){
      req.body[prop] = sanitize(req.body[prop]);
    }
  }
  next();
};

export default sanitizeInput;