const Article = require('../models/article');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/not-found');

module.exports.getArticles = (req, res, next) => {
  const loggedUser = req.user;

  Article.find({ owner: loggedUser })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.addArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const loggedUser = req.user;

  Article.create({
    keyword, title, text, date, source, link, owner: loggedUser, image,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.removeArticle = (req, res, next) => {
  const ArticleOwner = req.user._id;
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFound('Карточки с таким ID не существует');
      }
      if (ArticleOwner !== article.owner.toString()) {
        return Promise.reject(new Forbidden('Нет прав'));
      }
      return res.send({ data: article });
    })
    .catch(next);
};
