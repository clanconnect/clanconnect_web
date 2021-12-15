import "./styles.scss";
import {
  Form,
  Input,
  Button,
  Upload,
  DatePicker,
  TimePicker,
  Select,
  message,
  Switch,
  Row,
  Col,
  Image,
  Alert,
  Space,
} from "antd";
import moment from "moment";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "redux/creators/socials/youtube/actions";
import { countries, languages } from "common/dataManager";
import { indiaCategories } from "./dataManagar";
import { MediaService } from "services/creators";

const { Option } = Select;

const YoutubeUploadForm = ({
  creative,
  closeDrawer,
  setIsYtFormDescriptionVisible,
  setIsYtScheduleExistForCreative,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const countryCategories = useSelector(
    (store) => store.CreatorYoutube.countryCategoriesYoutubeResponse
  );
  const youtubeData = useSelector((store) => store.CreatorYoutube.data);
  const shouldConnectGoogleAccount = useSelector(
    (store) => store.CreatorYoutube.shouldConnectGoogleAccount
  );

  const [categories, setCategories] = useState([...indiaCategories]);

  const [formSubmitted, setFormSubitted] = useState(false);

  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [prevThumbnail, setPrevThumbnail] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [imageRequiredState, setImageRequiredState] = useState(true);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [mediaValidateAlert, setMediaValidateAlert] = useState(null);
  const [connectAccountBanner, setConnectAccountBanner] = useState(null);

  useEffect(() => {
    user &&
      !user.youtube_auth &&
      dispatch({
        type: ACTIONS.SET_STATE,
        payload: { shouldConnectGoogleAccount: true },
      });
  }, [user.youtube_auth]);

  useEffect(() => {
    const video = creative?.media.find(
      (o) => o.mimeType.includes("video") && o.status === "accepted"
    );

    if (!video) {
      setSubmitBtnDisabled(true);
      setMediaValidateAlert(
        validationAlert(
          "Cannot find any approved version of video for this creative"
        )
      );
    }

    if (youtubeData?.creative === creative.id) {
      form.setFieldsValue({
        title: youtubeData?.title,
        tags: youtubeData?.tags,
        description: youtubeData?.description,
        country: "IN",
        categoryId: youtubeData?.categoryId,
        defaultLanguage: youtubeData?.defaultLanguage,
        license: youtubeData?.license,
        privacyStatus: youtubeData?.privacyStatus,
        publicStatsVisible: youtubeData?.publicStatsVisible,
        madeForKids: youtubeData?.madeForKids,
        notifySubscribers: youtubeData?.notifySubscribers,
        date: moment(youtubeData?.liveAt),
        time: moment(youtubeData?.liveAt),
      });

      setPrevThumbnail(youtubeData?.thumbnail);
      setShowForm(false);
    }
  }, []);

  const handleMediaChange = (info) => {
    setFileList(info.fileList);
  };

  const beforeImageUpload = (file) => {
    validateFile(file);
    return false;
  };

  const handleMediaUpload = () => {
    if (!validateFile(fileList[0])) {
      return;
    }
    setUploadingFile(true);

    const updateProgress = (fileUid, progress) => {
      setUploadProgress((prevState) => {
        return { ...prevState, ...{ [fileUid]: progress } };
      });
    };

    MediaService.uploadMultiple(fileList, updateProgress)
      .then((res) => {
        const uploadedFiles = [];
        for (const media of res) {
          uploadedFiles.push(media);
        }

        setUploadedMedia([...uploadedFiles]);
        setUploadingFile(false);
        setIsUploadComplete(true);
        setImageRequiredState(false);
        form.setFieldsValue({ thumbnail: uploadedFiles[0].server });
      })
      .catch((e) => console.log(e));
  };

  const validateFile = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onFinish = (values) => {
    const date = moment(values.date).format("YYYY-MM-DD");
    const time = moment(values.time).format("HH:mm:ss");
    const liveAt = new Date(`${date} ${time}`);
    dispatch({
      type: ACTIONS.ADD_POST,
      payload: {
        body: {
          title: values.title,
          tags: values.tags,
          description: values.description,
          category: categories.find((item) => item.id === values.categoryId)
            ?.snippet?.title,
          categoryId: values.categoryId,
          defaultLanguage: values.defaultLanguage,
          license: values.license,
          privacyStatus: "public",
          publicStatsVisible: values.publicStatsVisible,
          madeForKids: values.madeForKids,
          notifySubscribers: values.notifySubscribers,
          liveAt: liveAt.toISOString(),
          creativeId: creative.id,
          videoMediaId: creative.media.find(
            (item) => item.status === "accepted"
          ).id,
          thumbnailMediaId:
            uploadedMedia.length !== 0
              ? uploadedMedia[0].server.id
              : prevThumbnail?.id,
        },
      },
    });
    message.success("Form Submitted");
    setIsYtFormDescriptionVisible(true);
    setIsYtScheduleExistForCreative(true);
    setFormSubitted(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Form errored");
  };

  const handleCountryChange = (value) => {
    dispatch({
      type: ACTIONS.GET_CATEGORIES,
      payload: { query: { regionCode: value } },
    });
    setCategories(countryCategories);
  };

  function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().subtract(1, "day").endOf("day");
  }

  const validationAlert = (msg) => (
    <Alert description={msg} type="warning" showIcon />
  );

  useEffect(() => {
    shouldConnectGoogleAccount &&
      setConnectAccountBanner(
        <Alert
          description="Your Youtube account is not connected. To schedule, you need to connect your account. Do you wish to connect now?"
          type="warning"
          showIcon
          action={
            <Space direction="vertical">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  dispatch({
                    type: ACTIONS.SET_STATE,
                    payload: { shouldConnectGoogleAccount: false },
                  });
                  window.location.href = "/clan_profile?openPopup=google";
                }}
              >
                Connect Now
              </Button>
            </Space>
          }
        />
      );
    shouldConnectGoogleAccount && setSubmitBtnDisabled(true);
  }, [shouldConnectGoogleAccount]);

  return (
    <>
      {mediaValidateAlert}
      {connectAccountBanner}
      {!formSubmitted && (
        <Form
          form={form}
          layout="vertical"
          className="flex flex-column"
          name="youtube"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            madeForKids: false,
            defaultLanguage: "en",
            license: "YouTube",
            notifySubscribers: true,
            privacyStatus: "public",
            publicStatsVisible: true,
            country: "IN",
          }}
        >
          <Form.Item
            name="title"
            label="Video Title"
            rules={[
              {
                required: true,
                message: "Please enter Video Title",
              },
            ]}
          >
            <Input placeholder="Add video title" disabled={submitBtnDisabled} />
          </Form.Item>

          {showForm && (
            <Form.Item
              name="thumbnail"
              label="Video Thumbnail"
              valuePropName="fileList"
              shouldUpdate
              rules={[
                {
                  required: imageRequiredState,
                },
              ]}
              getValueFromEvent={() => {}}
              extra="Upload thumbnail of size less than 2MB and of format jpeg/png. Please make sure to verify your mobile on YouTube before scheduling post."
            >
              <Upload
                onChange={handleMediaChange}
                multiple={false}
                beforeUpload={beforeImageUpload}
                progress={uploadProgress}
                maxCount={1}
                disabled={submitBtnDisabled}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
              <Button
                type="primary"
                className="upload-btn"
                onClick={handleMediaUpload}
                disabled={fileList.length === 0}
                loading={uploadingFile}
              >
                {isUploadComplete
                  ? "Uploaded"
                  : uploadingFile
                  ? "Uploading"
                  : "Upload"}
              </Button>
            </Form.Item>
          )}
          {!showForm && (
            <Row>
              <Image
                width={200}
                src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${youtubeData?.thumbnail?.slug}`}
              />
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setShowForm(true);
                }}
              ></Button>
            </Row>
          )}

          <Form.Item
            label="Video Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the Video Description",
              },
            ]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Add video description"
              disabled={submitBtnDisabled}
            />
          </Form.Item>
          <Row>
            <Col span={8}>
              <Form.Item
                name="country"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Please select a Country",
                  },
                ]}
              >
                <Select
                  onChange={handleCountryChange}
                  disabled={submitBtnDisabled}
                >
                  {countries.map((o, idx) => (
                    <Option key={idx} value={o.code}>
                      {o.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                dependencies={["country"]}
                name="categoryId"
                label="Category"
                className="ml-4"
                rules={[
                  {
                    required: true,
                    message: "Please input select a Category",
                  },
                ]}
              >
                <Select
                  placeholder="Select a Category"
                  disabled={submitBtnDisabled}
                >
                  {categories &&
                    categories.map((o, idx) => (
                      <Option key={idx} value={o.id}>
                        {o.snippet.title}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            disabled={submitBtnDisabled}
            label="Video Tags"
            name="tags"
            rules={[{ required: true, message: "Please enter video tags" }]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags"
              disabled={submitBtnDisabled}
            />
          </Form.Item>
          <Row>
            <Form.Item
              label="Schedule Date"
              name="date"
              rules={[{ required: true, message: "Please enter Date" }]}
            >
              <DatePicker
                disabledDate={disabledDate}
                format={"DD/MM/YYYY"}
                disabled={submitBtnDisabled}
              />
            </Form.Item>
            <Form.Item
              disabled={submitBtnDisabled}
              label="Schedule Time"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Please enter Time",
                },
                ({ getFieldValue }) => ({
                  validator: (_, value) => {
                    const date = moment(getFieldValue("date")).format(
                      "YYYY-MM-DD"
                    );
                    const time = moment(value).format("HH:mm:ss");
                    const liveAt = new Date(`${date} ${time}`);
                    if (liveAt < Date.now()) {
                      return Promise.reject(
                        new Error("Please enter a valid time")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <TimePicker
                className="ml-4"
                minuteStep={5}
                use12Hours
                format="HH:mm"
                disabled={submitBtnDisabled}
              />
            </Form.Item>
          </Row>
          <Form.Item
            disabled={submitBtnDisabled}
            name="madeForKids"
            label="Is the video made for Kids?"
            valuePropName="checked"
            rules={[{ required: true, message: "Please enter input" }]}
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              disabled={submitBtnDisabled}
            />
          </Form.Item>

          <Form.Item
            disabled={submitBtnDisabled}
            name="defaultLanguage"
            label="Default Language"
            rules={[
              { required: true, message: "Please enter default lanuage" },
            ]}
          >
            <Select disabled={submitBtnDisabled}>
              {languages.map((o, idx) => (
                <Option key={idx} value={o.value}>
                  {o.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            disabled={submitBtnDisabled}
            name="license"
            label="License Information"
            rules={[
              { required: true, message: "Please enter license information" },
            ]}
          >
            <Select disabled={submitBtnDisabled}>
              <Option value="youtube">YouTube</Option>
              <Option value="creativeCommons">Creative Commons</Option>
            </Select>
          </Form.Item>

          <Form.Item
            disabled={submitBtnDisabled}
            name="privacyStatus"
            label="Privacy Status"
            rules={[{ required: true, message: "Please enter Privacy Status" }]}
          >
            <Select disabled={submitBtnDisabled}>
              <Option value="public">Public</Option>
              <Option value="private">Private</Option>
              <Option value="unlisted">Unlisted</Option>
            </Select>
          </Form.Item>

          <Form.Item
            disabled={submitBtnDisabled}
            name="publicStatsVisible"
            label="Show Statistics Information to Public"
            valuePropName="checked"
            rules={[{ required: true, message: "Please enter input" }]}
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              disabled={submitBtnDisabled}
            />
          </Form.Item>

          <Form.Item
            disabled={submitBtnDisabled}
            name="notifySubscribers"
            label="Notify Subscribers"
            valuePropName="checked"
            rules={[{ required: true, message: "Please enter input" }]}
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              disabled={submitBtnDisabled}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={submitBtnDisabled}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default YoutubeUploadForm;
