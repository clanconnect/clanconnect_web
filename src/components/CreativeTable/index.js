import React from "react";
import "./styles.scss";
import { Table, Pagination, Tag } from "antd";
import SearchSelectBox from "../SearchSelectBox";
import CreativeModal from "../CreativeModal";
import { compaingsData, allInfluencerData } from "./dataManager";
import { getAllCreativesAction } from "redux/brands/creatives/actions";
import { useDispatch } from "react-redux";
import { convertSizeForHuman } from "helpers";

const statusTags = {
  rejected: <Tag color="#f50">Rejected</Tag>,
  pending: <Tag color="#2db7f5">Pending</Tag>,
  accepted: <Tag color="#87d068">Accepted</Tag>,
};

const CreativeTable = ({ allCreativeDetails, meta }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: (
        <SearchSelectBox data={compaingsData} defaultValue="All Campaigns" />
      ),
      dataIndex: ["project", "title"],
      key: ["project", "title"],
    },
    {
      title: "Posts",
      dataIndex: "posts",
      render: (text, record, index) => (
        <CreativeModal
          versionTrue
          className="version-title"
          creative={record}
        />
      ),
      key: "posts",
    },

    {
      title: (
        <SearchSelectBox
          data={allInfluencerData}
          defaultValue="All Influencers"
        />
      ),
      dataIndex: ["user", "name"],
      key: ["user", "name"],
    },
    {
      title: "Size",
      render: (value, record, index) => convertSizeForHuman(value),
      dataIndex: ["stats", "storageSizeInBytes"],
      key: ["stats", "storageSizeInBytes"],
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (value, record, index) => new Date(value).toLocaleDateString(),
      key: "createdAt",
    },
    {
      title: "Status",
      render: (i, row) => statusTags[row.status],
      key: "status",
    },
  ];

  return (
    <div>
      {/* {showAddedRow ? (
        <div className="added-row">
          <div>
            <p className="mb-0 added-row-text">2 rows selected:</p>
          </div>
          <div>
            <button className="delete-btn">
              <DeleteOutlined /> Delete
            </button>
            <button className="delete-btn bg-download">
              <DownloadOutlined /> Download
            </button>
          </div>
        </div>
      ) : null} */}
      <Table
        columns={columns}
        dataSource={allCreativeDetails}
        // rowSelection={rowSelection}
        pagination={false}
      />
      <Pagination
        defaultCurrent={1}
        total={+meta.total}
        pageSize={+meta.perPage}
        current={+meta.page}
        onChange={(page, perPage) => {
          dispatch(
            getAllCreativesAction({
              params: { include: "media,user,project", page },
            })
          );
        }}
      />
    </div>
  );
};

export default CreativeTable;
