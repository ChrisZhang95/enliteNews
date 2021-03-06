import React from "react";
import ArticleCard from "../ArticleCard/articleCard.component";
import { BACKEND_URL } from "../../../constants";

import { connect } from "react-redux";
import { updateArticleList, selectArticle } from "../../../redux/articlesRedux/articles.action";

class ArticleList extends React.Component {
  state = {
    articles: "",
    article: ""
  };

  componentDidMount() {
    this.fetchArticles("");
  }

  render() {
    const { articleList } = this.props;
    return (
      <div className="mh3 articleList">
        {articleList === "" ? (
          <div className="loader center mt3"></div>
        ) : (
          articleList.map((article, i) => {
            return <ArticleCard key={i} article={article} />;
          })
        )}
      </div>
    );
  }

  fetchArticles = category => {
    fetch(BACKEND_URL + "news", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: category
      })
    })
      .then(response => response.json())
      .then(res => {
        this.props.updateArticleList(res.articles);
        this.props.selectArticle(res.articles[0]);
      });
  };
}

const mapStateToProps = state => ({
  articleList: state.articleReducer.articleList
});

const mapDispatchToProps = dispath => ({
  updateArticleList: articleList => dispath(updateArticleList(articleList)),
  selectArticle: article => dispath(selectArticle(article))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList);
