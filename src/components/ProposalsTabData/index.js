import React, { useEffect } from "react";
import { Tabs, Empty } from "antd";
import { useParams } from "react-router-dom";

import BrandListCard from "../BrandListCard";
import { getProposalsAction } from "redux/brands/proposals/actions";

import "./styles.scss";
import { useDispatch } from "react-redux";

const ProposalsTabData = ({
  defaultActiveKey,
  getProposals,
  proposalDetails,
}) => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    if (defaultActiveKey === "sent") {
      let params = {
        include: "user",
        status: "sent",
      };
      dispatch(getProposalsAction({ params, id }));
    }
  }, []);

  const fetchNotScheduledCreatives = (projects) => {
    projects = projects.filter(({ creatives }) => creatives.length !== 0);

    projects = projects.filter(({ creatives }) => {
      (creatives || []).forEach((c) => {
        return !c.socials || (!c.socials.youtube && !c.socials.instagram);
      });
      return true;
    });

    projects = projects.map(({ creatives, project }) => {
      creatives = creatives.filter(
        (c) => !c.socials || (!c.socials.youtube && !c.socials.instagram)
      );
      return { project, creatives };
    });

    return projects;
  };

  const fetchScheduledCreatives = (projects) => {
    projects = projects.filter(({ creatives }) => creatives.length !== 0);

    projects = projects.filter(({ creatives }) => {
      (creatives || []).forEach(
        (c) => c.socials && (c.socials.youtube || c.socials.instagram)
      );
      return true;
    });

    projects = projects
      .map(({ creatives, project }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            ((c.socials.youtube && !c.socials.youtube?.isUploaded) ||
              (c.socials.instagram && !c.socials.instagram.isUploaded))
        );
        return { project, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return projects;
  };

  const fetchLiveCreatives = (projects) => {
    projects = projects.filter(({ creatives }) => creatives.length !== 0);

    projects = projects
      .map(({ creatives, project }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            (c.socials?.youtube?.isUploaded || c.socials?.instagram?.isUploaded)
        );
        return { project, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return projects;
  };

  const fetchCancelledCreatives = (projects) => {
    projects = projects.filter(({ creatives }) => creatives.length !== 0);

    projects = projects
      .map(({ creatives, project }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            (c.socials?.youtube?.isErrored ||
              c.socials?.youtube?.cancelReason ||
              c.socials?.instagram?.isErrored ||
              c.socials?.instagram?.cancelReason)
        );
        return { project, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return projects;
  };

  console.log(proposalDetails, "user");
  return (
    <div className="tab-proposal">
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => getProposals(key)}
      >
        <TabPane tab="Pending" key="sent">
          <div id="sent">
            {proposalDetails != 0 ? (
              proposalDetails &&
              proposalDetails.map((data, index) => {
                return [data.user].map((list, i) => {
                  return (
                    <BrandListCard
                      name={list?.name}
                      img={list?.image}
                      key={i}
                    />
                  );
                });
              })
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </TabPane>

        <TabPane tab="Approved" key="accepted">
          {proposalDetails != 0 ? (
            proposalDetails &&
            proposalDetails.map((data, index) => {
              return [data.user].map((list, i) => {
                return (
                  <BrandListCard name={list?.name} img={list?.image} key={i} />
                );
              });
            })
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>

        <TabPane tab="Rejected" key="rejected">
          {proposalDetails != 0 ? (
            proposalDetails &&
            proposalDetails.map((data, index) => {
              return [data.user].map((list, i) => {
                return (
                  <BrandListCard name={list?.name} img={list?.image} key={i} />
                );
              });
            })
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProposalsTabData;
