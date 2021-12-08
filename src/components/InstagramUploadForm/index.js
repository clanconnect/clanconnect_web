import "./styles.scss";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  message,
  Row,
  Alert,
  Modal,
} from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "redux/creators/socials/instagram/actions";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { confirm } = Modal;

const InstagramUploadForm = ({
  closeDrawer,
  creative,
  setIsIgFormDescriptionVisible,
  setIsIgScheduleExistForCreative,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const instagramData = useSelector((store) => store.CreatorInstagram.data);
  const fbPagesData = useSelector((store) => store.CreatorInstagram.fbPages);
  const shouldConnectFbAccount = useSelector(
    (store) => store.CreatorInstagram.shouldConnectFbAccount
  );

  const instagramUserId = useSelector((store) => store.CreatorInstagram.igId);
  const [formSubmitted, setFormSubitted] = useState(false);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [mediaValidateAlert, setMediaValidateAlert] = useState(null);

  const validateImage = (image) => {
    const aspectRatio = image.meta.width / image.meta.height;
    if (aspectRatio < 0.8 || aspectRatio > 1.91) {
      return "Image's aspect ratio should either be 4:5 or 16:9";
    }

    const sizeInMb = image.size / 1024 / 1024;
    const format = image.mimeType.split("/")[1];
    if (sizeInMb > 8) {
      return "Image's size should be less than 8MBs";
    }
    if (!["png", "jpg", "jpeg"].includes(format)) {
      return "Image's format should either be .png or .jpg/.jpeg";
    }

    return false;
  };

  const validateVideo = (video) => {
    if (video.duration < 3 || video.duration > 60) {
      return "Allowed duration of video is 3 seconds minimum and 60 seconds maximum";
    }

    const aspectRatio = video.meta.width / video.meta.height;
    if (aspectRatio < 0.8 || aspectRatio > 1.91) {
      return "Video's aspect ratio should either be 4:5 or 16:9";
    }

    const sizeInMb = video.size / 1024 / 1024;
    if (sizeInMb > 100) {
      return "Video's size should be less than 100MBs";
    }

    const format = video.mimeType.split("/")[1];
    if (!["mp4", "mov"].includes(format)) {
      return "Video's format should either be .mp4 or .mov";
    }

    return false;
  };

  const validationAlert = (msg) => (
    <Alert description={msg} type="warning" showIcon />
  );

  useEffect(() => {
    const image = creative?.media.find(
      (o) => o.mimeType.includes("image") && o.status === "accepted"
    );
    const video = creative?.media.find(
      (o) => o.mimeType.includes("video") && o.status === "accepted"
    );

    if (image) {
      const imageError = validateImage(image);
      if (imageError) {
        setSubmitBtnDisabled(true);
        setMediaValidateAlert(validationAlert(imageError));
      }
    }

    if (video) {
      const videoError = validateVideo(video);
      if (videoError) {
        setSubmitBtnDisabled(true);
        setMediaValidateAlert(validationAlert(videoError));
      }
    }

    if (instagramData?.creative === creative.id) {
      form.setFieldsValue({
        caption: instagramData?.caption,
        date: moment(instagramData?.liveAt),
        time: moment(instagramData?.liveAt),
      });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_FB_PAGES });
  }, []);

  const handleAccountChange = (values) => {
    // const [id, name] = value.split("-:-");
    if (values?.account) {
      dispatch({
        type: ACTIONS.FETCH_IG_ID,
        payload: {
          path: {
            fbId: values.account,
          },
        },
      });
    }
  };

  const onFinish = (values) => {
    const date = moment(values.date).format("YYYY-MM-DD");
    const time = moment(values.time).format("HH:mm:ss");
    const liveAt = new Date(`${date} ${time}`);
    dispatch({
      type: ACTIONS.ADD_POST,
      payload: {
        body: {
          caption: values.caption,
          liveAt: liveAt.toISOString(),
          creativeId: creative.id,
          mediaId: creative.media.find((item) => item.status === "accepted").id,
          mediaType: creative.media
            .find((item) => item.status === "accepted")
            .mimeType.split("/")?.[0],
          accountName: fbPagesData.find(
            (o) => o.id === form.getFieldValue("account")
          ).name,
          // accountId: "17841447868680048",
          accountId: instagramUserId,
        },
      },
    });
    message.success("Form Submitted");
    setIsIgFormDescriptionVisible(true);
    setIsIgScheduleExistForCreative(true);
    setFormSubitted(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(creative);
    console.log("Failed:", errorInfo);
    message.error("Form errored");
  };

  function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().subtract(1, "day").endOf("day");
  }

  if (shouldConnectFbAccount) {
    confirm({
      title: "Attention",
      icon: <ExclamationCircleOutlined />,
      content:
        "Your Instagram account is not connected. To schedule, you need to connect your account. Do you wish to connect now?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        window.location.href = "/clan_profile?openPopup=facebook";
        console.log("OK");
      },
      onCancel() {
        dispatch({
          type: ACTIONS.SET_STATE,
          payload: { shouldConnectFbAccount: false },
        });
        closeDrawer();
      },
    });
  }

  return (
    <>
      {mediaValidateAlert}
      {!formSubmitted && (
        <Form
          form={form}
          layout="vertical"
          className="flex flex-column"
          name="youtube"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleAccountChange}
        >
          <Form.Item
            name="account"
            label="Account"
            // getValueFromEvent={handleAccountChange}
            rules={[
              {
                required: true,
                message: "Please enter your account",
              },
            ]}
          >
            <Select disabled={submitBtnDisabled}>
              {fbPagesData &&
                fbPagesData?.map((o, idx) => (
                  <Option key={idx} value={o.id}>
                    {o.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Caption"
            name="caption"
            rules={[
              {
                required: true,
                message: "Please enter the caption",
              },
              {
                validator: (_, value) => {
                  value = value || "";
                  if (value.length >= 2200) {
                    return Promise.reject(
                      new Error("Character Limit of 2200 character exceeded")
                    );
                  }
                  if (
                    value.split(" ").filter((elem) => elem.includes("#"))
                      .length > 30
                  ) {
                    return Promise.reject(
                      new Error("Limit of 30 hashtags exceeded")
                    );
                  }
                  if (
                    value.split(" ").filter((elem) => elem.includes("@"))
                      .length > 20
                  ) {
                    return Promise.reject(
                      new Error("Limit of 20 usertags exceeded")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.TextArea
              placeholder="Add post body, hastags, etc."
              rows={2}
              disabled={submitBtnDisabled}
            />
          </Form.Item>

          <Row>
            <Form.Item
              label="Schedule Date"
              name="date"
              rules={[{ required: true, message: "Please enter schedule" }]}
            >
              <DatePicker
                disabledDate={disabledDate}
                format={"DD/MM/YYYY"}
                disabled={submitBtnDisabled}
              />
            </Form.Item>
            <Form.Item
              label="Schedule Time"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Please enter schedule",
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
export default InstagramUploadForm;
