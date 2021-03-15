import React from "react";
import "./styles.scss";
import { Table, Tag } from "antd";
import CreativeModal from "../CreativeModal";
import { getAllCreativesAction } from "redux/brands/creatives/actions";
import { useDispatch } from "react-redux";
import { convertSizeForHuman } from "helpers";

const statusTags = {
  rejected: <Tag color="#f50">Rejected</Tag>,
  pending: <Tag color="#2db7f5">Pending</Tag>,
  accepted: <Tag color="#87d068">Accepted</Tag>,
};

const CreativeTable = ({ allCreativeDetails, pagination = {} }) => {
  const dispatch = useDispatch();
  console.log("all creative details ====> ", allCreativeDetails);
  const columns = [
    {
      title: "Campaign Name",
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
      title: "Influencer Name",
      dataIndex: ["user", "name"],
      key: ["user", "name"],
    },
    {
      title: "Size",
      render: (value, record, index) => convertSizeForHuman(value),
      dataIndex: ["stats", "storageSizeInBytes"],
      key: "storageSize",
      sorter: { multiple: 1 },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value, record, index) => new Date(value).toLocaleDateString(),
      key: "createdAt",
      sorter: { multiple: 2 },
    },
    {
      title: "Status",
      render: (i, row) => statusTags[row.status],
      key: "status",
      filterMultiple: false,
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Accepted", value: "accepted" },
        { text: "Rejected", value: "rejected" },
      ],
    },
  ];

  const onPageChange = (pagination, filters, sorter = {}) => {
    let sortOrder = {};
    if (Array.isArray(sorter)) {
      sorter.forEach((s) => (sortOrder[s.columnKey] = s.order));
    } else {
      if (Object.keys(sorter).length > 1)
        sortOrder[sorter.columnKey] = sorter.order;
    }

    dispatch(
      getAllCreativesAction({
        params: {
          include: "media,user,project",
          page: pagination.current,
          perPage: pagination.pageSize,
          status: (filters?.status || []).join(","),
          sortOrder: JSON.stringify(sortOrder),
        },
      })
    );
  };

  console.log("pagination ====> ", pagination);
  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={allCreativeDetails}
        onChange={onPageChange}
        pagination={{
          total: pagination.total,
          current: pagination.page,
          pageSize: pagination.perPage,
          defaultCurrent: 1,
        }}
      />
    </div>
  );
};

export default CreativeTable;
