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
  setIsFormDescriptionVisible,
  setIsYtScheduleExistForCreative,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const countryCategories = useSelector(
    (store) => store.CreatorYoutube.countryCategoriesYoutubeResponse
  );
  const youtubeData = useSelector((store) => store.CreatorYoutube.data);
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
  // const [initialFormValues, setInitialFormValues] = useState({

  // });

  useEffect(() => {
    console.log("youtubeform", youtubeData, creative);
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
        console.log("res =====>", res);
        const uploadedFiles = [];
        for (const media of res) {
          uploadedFiles.push(media);
        }

        setUploadedMedia([...uploadedFiles]);
        setUploadingFile(false);
        setIsUploadComplete(true);
        setImageRequiredState(false);
        console.log("uploaded Files", uploadedFiles);
        console.log("uploaded Media", uploadedMedia);
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
    console.log(values);
    const date = moment(values.data).format("MM/DD/YY");
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
          privacyStatus: values.privacyStatus,
          publicStatsVisible: values.publicStatsVisible,
          madeForKids: values.madeForKids,
          notifySubscribers: values.notifySubscribers,
          liveAt: liveAt.toISOString(),
          creativeId: creative.id,
          // videoMediaId: "609136d8d0b39f1913a89155",
          // thumbnailMediaId: "60a36c7ca3507cceb192f063",
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
    setIsFormDescriptionVisible(true);
    setIsYtScheduleExistForCreative(true);
    setFormSubitted(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(creative);
    console.log("Failed:", errorInfo);
    message.error("Form errored");
  };

  const normFile = (e) => {};

  const handleCountryChange = (value) => {
    dispatch({
      type: ACTIONS.GET_CATEGORIES,
      payload: { query: { regionCode: value } },
    });
    setCategories(countryCategories);
  };

  return (
    <>
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
            license: "youtube",
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
            <Input />
          </Form.Item>

          {showForm && (
            <Form.Item
              name="upload"
              label="Video Thumbnail"
              valuePropName="fileList"
              rules={[
                {
                  required: imageRequiredState,
                  message: "Please upload the video thumbnail!",
                },
              ]}
              getValueFromEvent={normFile}
              extra="Upload thumbnail"
            >
              <Upload
                name="thumbnail"
                onChange={handleMediaChange}
                multiple={false}
                beforeUpload={beforeImageUpload}
                progress={uploadProgress}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
              {/* <input type="file" onChange={beforeImageUpload} /> */}
              <Button
                type="primary"
                onClick={handleMediaUpload}
                disabled={fileList.length === 0}
                loading={uploadingFile}
                style={{ marginTop: 16 }}
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
            <Input.TextArea rows={5} />
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
                <Select onChange={handleCountryChange}>
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
                <Select placeholder="Select a Category">
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
            label="Video Tags"
            name="tags"
            rules={[{ required: true, message: "Please enter video tags" }]}
          >
            <Select mode="tags" style={{ width: "100%" }} placeholder="Tags" />
          </Form.Item>
          <Row>
            <Form.Item
              label="Schedule Time"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please enter schedule",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Schedule Time"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Please enter schedule",
                },
              ]}
            >
              <TimePicker
                className="ml-4"
                minuteStep={5}
                use12Hours
                format="HH:mm"
              />
            </Form.Item>
          </Row>
          <Form.Item
            name="madeForKids"
            label="Is the video made for Kids?"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please enter input",
              },
            ]}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item
            name="defaultLanguage"
            label="Default Language"
            rules={[
              {
                required: true,
                message: "Please enter default lanuage",
              },
            ]}
          >
            <Select>
              {languages.map((o, idx) => (
                <Option key={idx} value={o.value}>
                  {o.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="license"
            label="License Information"
            rules={[
              {
                required: true,
                message: "Please enter license information",
              },
            ]}
          >
            <Select>
              <Option value="youtube">Youtube</Option>
              <Option value="creativeCommons">Creative Commons</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="privacyStatus"
            label="Privacy Status"
            rules={[
              {
                required: true,
                message: "Please enter Privacy Status",
              },
            ]}
          >
            <Select>
              <Option value="public">Public</Option>
              <Option value="private">Private</Option>
              <Option value="unlisted">Unlisted</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="publicStatsVisible"
            label="Show Satistics Information to Public"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please enter input",
              },
            ]}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item
            name="notifySubscribers"
            label="Notify Subscribers"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please enter input",
              },
            ]}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default YoutubeUploadForm;
