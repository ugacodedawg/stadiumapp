import * as express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/landing', function(req, res, next) {
  res.render('landing');
});

export default router;
