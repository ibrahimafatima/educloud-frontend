import React from "react";
import Header from "../../component/news-feed.component/header";
import AllFeed from "../../component/news-feed.component/all-feed";
import PostArea from "./../../component/news-feed.component/post-area";
import FirstNews from "./../../component/news-feed.component/first-news";
import RecentEvent from "./../../component/news-feed.component/recent-event";
import MiddleFeed from "./../../component/news-feed.component/middle-feed";
import UpcomingExams from "./../../component/news-feed.component/upcming-exams";
import NewsFeedFooter from "./../../component/news-feed.component/newsfeed-footer";
import ResponsiveHeader from "../../component/news-feed.component/responsive-header";
import RecentEventMobile from "./../../component/news-feed.component/recent-event-mobile";
import UpcomingExamsMobile from "./../../component/news-feed.component/upcoming-exams-mobile";
import "./newsfeed.style.main.css";
import "./newsfeed.style.color.css";
import "./newsfeed.style.css";
import "./newsfeed.style.responsive.css";

const NewsFeed = () => {
  return (
    <div className="theme-layout">
      <ResponsiveHeader />
      <Header />
      <section className="body-top-margin">
        <div className="gap gray-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row merged20" id="page-contents">
                  <RecentEvent />
                  <div className="col-lg-6">
                    <PostArea />
                    <FirstNews />
                    <RecentEventMobile />
                    <MiddleFeed />
                    <UpcomingExamsMobile />
                    <AllFeed />
                  </div>
                  <UpcomingExams />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewsFeedFooter />
    </div>
  );
};

export default NewsFeed;
