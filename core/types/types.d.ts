declare module 'custom-type' {
    //Create Order Type
    export type Required = {
        user_id: number;
        account_id: number;
    };

    export type CreateOrder = {
      user_id: number;
      account_id: number;
      influencer_id: number;
      account_type?: string;
      account_name?: string;
      login_email?: string;
      login_mobile?: string;
      plan_id: number;
      orderDetail: {
        amount: string;
        currency: string;
        notes: {
          key1: string;
        };
      };
      campaign_id: number;
      brand_id: number;
      state: string;
      address: string;
      pincode: string;
      pan: string;
      gstin: string;
    };

    export type GetDiscoverInfluencer = {
        user_id: number;
        account_id: number;
        //Like influencer_type ('youtube', 'instagram')
        influencer_type: string;
        page: number;
    };

    export type DeleteInfluencerInList = {
        user_id: number;
        account_id: number;
        list_id: number;
        sm_ids: number[];
    };

    export type GetDiscoverInfluencer = {
        user_id: number;
        account_id: number;
        //Like influencer_type ('youtube', 'instagram')
        influencer_type: string;
    };
    export type compareInfluencers = {
        sm_id: number;
        influencer_handle_name: string;
    };

    export type ClanShopCreateOrder = {
        shop_id: number;
        product_id;
        user_id: number;
        address_id: number;
        cart_details: any;
        orderDetail: {
            amount: string;
            currency: string;
            notes: {
                key1: string;
            };
        };
    };

    export type ResponseType = {
        data: {
            status: { status: boolean; message: string };
            rows: any[];
        };
    };

    export type AddInfluencer = {
        user_id: number;
        account_id: number;
        brand_id: number;
        influencer_id: number;
        lists: any[];
        influencers: any[];
    };

    export type AddToCampaign = {
        user_id: number;
        account_id: number;
        brand_id: number;
        campaign_influencer_id: any[];
    };

    export type ApplyRestriction = {
        influencerId: any;
        platform: string;
        smId: any;
        campaignId: any;
        accountId: any;
    }

    export type GetSm_id = {
        influencerId: any;
        campaign_id: any;
    }

    export type GetDiscoverInfluencer = {
        user_id: number;
        account_id: number;
        //Like influencer_type ('youtube', 'instagram')
        influencer_type: string;
    };

    export type GetUploadedURL = Required & {
        campaign_id: number;
    };
    export type AddUploadURL = Required & {
        negotiation_id: number;
        uploaded_url: string;
    };
    export type DeleteUploadURL = Required & {
        url_id: number;
    };
    export type UpdateUploadURL = Required &
        DeleteUploadURL & {
            updated_url: number;
        };

    export type DeleteInfluencerInList = {
        user_id: number;
        account_id: number;
        list_id: number;
        influencer_ids: number[];
    };

    export type SubscriptionInvoiceType = {
        id: number;
        invoice_number: string;
        subscription_id: number;
        invoice_title: string;
        customer_name: string;
        customer_email: string;
        customer_phone: string;
        shipping_address: string;
        shipping_state: string;
        shipping_pincode: string;
        billing_address: string;
        billing_state: string;
        billing_pincode: string;
        pan_number: string;
        gstin: string;
        order_id: string;
        payment_id: string;
        amount: number;
        igst: number;
        cgst: number;
        sgst: number;
        roundoff: number;
        total_amount: number;
        sac_code: string;
        quantity: number;
        payment_terms: string;
        plan_name: string;
        plan_type: string;
        plan_start: any;
        plan_end: any;
        invoice_date: any;
    };

    export type ClanShopCreateOrder = {
        shop_id: number;
        product_id;
        user_id: number;
        orderDetail: {
            amount: string;
            currency: string;
            notes: {
                key1: string;
            };
        };
    };

    //------------------------------------------------------- Creative -----------------------------------------------//

    export type UploadCreativeLinks = {
        campaign_id: number;
        proposal_id: number;
        creative_id: number;
        post_url: string;
        post_platform: string;
    };

    export type GetUploadedCreativeLinks = {
        campaign_id: number;
        creative_id: number;
    };

    export type DeleteUploadedCreativeLinks = GetUploadedCreativeLinks & {
        url_id: number;
    };

    //---------------------------------------------------------------- Invoice Section ----------------------------------------------------------------//

    export type IsApproved = Required & {
        campaign_id: number;
        influencer_id: number;
        sm_id: number | null;
    };

    export type GenerateInvoice = Required &
        IsApproved & {
            campaign_platform: string;
            proposal_id: string;
        };

    export type BrandGetInvoice = {
        campaign_id: number;
        influencer_id: number;
    };

    // --------------------------------For Analytics Section-----------------------------------------

    export type AnalyticsBrand = {
        data: {
            status: { status: boolean; message: string };
            analytics_data_ig_media: any[];
            analytics_data_ig_numeric: any[];
            analytics_data_yt_media: any[];
            analytics_data_yt_numeric: any[];
            influencer_data_content: any[];
            post_data_content: any[];
            graph_data_array: any[];
            no_of_creatives: any;
            amount_spent:any;
            total_er:any;
            yt_influencer_analytic_er:any[];
            yt_post_analytic_er:any[];
            total_posts: number;
            campaign_details:{}
            campaignTitle:string
        }
    };

    // Define the type for v360 entity registration page
    export type v360organizationDataTypeProps = {
        organization_id: int;
        organization_name: string;
        organization_logo: string;
        entity_type: string;
        showSubmitStatus?: (responseData: any) => void;
        responseMessage?: string;
        responseStatus?: boolean;
        isValidSession?: boolean;
    };

    // Define the type for formData for v360 registration
    export type v360EntityRegistrationFormProps = {
        entity_type: string;
        v360_group_organization_id: int;
        v360_group_organization_name: string;
        v360_group_engagement_person_name: string;
        v360_group_engagement_person_mobile: string;
        v360_group_engagement_person_email: string;
        company_name: string;
        brand_name: string;
        company_address: string;
        company_address_line2: string;
        country: string;
        postal_code: string;
        city: string;
        state: string;
        entity_sector: string;
        entity_sector_other: string;
        pan: string;
        tan: string;
        date_of_incorporation: string;
        rec_type: "Company" | "Individual" | "Firm" | "Other";
        rec_type_other: string;
        // gst_business_name: string;
        gst_registration_number: string;
        // hsn_code: string;
        gst_certificate_file_type: string;
        gst_certificate_file_name: string;
        gst_certificate_storage_size: int;
        gst_certificate_file_path: string;
        gst_certificate_file_url: string;
        finance_person_name: string;
        finance_person_designation: string;
        finance_person_mobile: string;
        finance_person_email: string;
        same_as_finance: string;
        contact_person_name: string;
        contact_person_designation: string;
        contact_person_mobile: string;
        contact_person_email: string;
        captchaToken: string;
    }

    // Define the type for formData for v360 registration form errors
    export type v360EntityRegistrationFormErrorProps = {
        entity_type: { status: boolean; message: string; touched: boolean; required: boolean };
        v360_group_organization_id: { status: boolean; message: string; touched: boolean; required: boolean };
        v360_group_organization_name: { status: boolean; message: string; touched: boolean; required: boolean };
        v360_group_engagement_person_name: { status: boolean; message: string; touched: boolean; required: boolean };
        v360_group_engagement_person_mobile: { status: boolean; message: string; touched: boolean; required: boolean };
        v360_group_engagement_person_email: { status: boolean; message: string; touched: boolean; required: boolean };
        company_name: { status: boolean; message: string; touched: boolean; required: boolean };
        brand_name: { status: boolean; message: string; touched: boolean; required: boolean };
        company_address: { status: boolean; message: string; touched: boolean; required: boolean };
        company_address_line2: { status: boolean; message: string; touched: boolean; required: boolean };
        country: { status: boolean; message: string; touched: boolean; required: boolean };
        postal_code: { status: boolean; message: string; touched: boolean; required: boolean };
        city: { status: boolean; message: string; touched: boolean; required: boolean };
        state: { status: boolean; message: string; touched: boolean; required: boolean };
        entity_sector: { status: boolean; message: string; touched: boolean; required: boolean };
        entity_sector_other: { status: boolean; message: string; touched: boolean; required: boolean };
        pan: { status: boolean; message: string; touched: boolean; required: boolean };
        tan: { status: boolean; message: string; touched: boolean; required: boolean };
        date_of_incorporation: { status: boolean; message: string; touched: boolean; required: boolean };
        rec_type: { status: boolean; message: string; touched: boolean; required: boolean };
        rec_type_other: { status: boolean; message: string; touched: boolean; required: boolean };
        // gst_business_name: { status: boolean; message: string; touched: boolean; required: boolean };
        gst_registration_number: { status: boolean; message: string; touched: boolean; required: boolean };
        // hsn_code: { status: boolean; message: string; touched: boolean; required: boolean };
        gst_certificate_file_type: { status: boolean; message: string; touched: boolean; required: boolean };
        gst_certificate_file_name: { status: boolean; message: string; touched: boolean; required: boolean };
        gst_certificate_storage_size: { status: boolean; message: string; touched: boolean; required: boolean };
        gst_certificate_file_path: { status: boolean; message: string; touched: boolean; required: boolean };
        gst_certificate_file_url: { status: boolean; message: string; touched: boolean; required: boolean };
        finance_person_name: { status: boolean; message: string; touched: boolean; required: boolean };
        finance_person_designation: { status: boolean; message: string; touched: boolean; required: boolean };
        finance_person_mobile: { status: boolean; message: string; touched: boolean; required: boolean };
        finance_person_email: { status: boolean; message: string; touched: boolean; required: boolean };
        same_as_finance: { status: boolean; message: string; touched: boolean; required: boolean };
        contact_person_name: { status: boolean; message: string; touched: boolean; required: boolean };
        contact_person_designation: { status: boolean; message: string; touched: boolean; required: boolean };
        contact_person_mobile: { status: boolean; message: string; touched: boolean; required: boolean };
        contact_person_email: { status: boolean; message: string; touched: boolean; required: boolean };
        captchaToken: { status: boolean; message: string; touched: boolean; required: boolean };
    }
}
declare module 'html2pdf.js' {
  const html2pdf: any;
  export default html2pdf;
}
