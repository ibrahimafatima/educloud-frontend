import React from "react";
import Header from "../../component/news-feed.component/header";
import PostArea from "./../../component/news-feed.component/post-area";
import FirstNews from "./../../component/news-feed.component/first-news";
import RecentEvent from "./../../component/news-feed.component/recent-event";
import NewsfeedItem from "./../../component/news-feed.component/newsfeed-item";
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
      <section>
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
                    <NewsfeedItem />
                    <UpcomingExamsMobile />
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
