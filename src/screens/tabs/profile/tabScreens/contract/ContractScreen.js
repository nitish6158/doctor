import {
    useState,
    useEffect,
} from 'react';
import {
    View,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    ResponsiveFont,
    Colors,
    Images,
} from '../../../../../assets';
import {
    CustomButton,
    UploadFileButton,
    DownloadButton
} from '../../../../../components/button';
import {
    SuccessModal,
    Loader
} from '../../../../../components/modal';
import {
    BankFormAction,
    UpdateUserInfo,
    SendContract,
    ClearContractStatus,
} from '../../../../../Redux/actions';
import {
    useTranslation,
    usePdfDownloader,
    useFileUpload,
    useApi
} from '../../../../../components/customhooks';

import { getRequest } from '../../../../../Redux/config';
import { END_POINT } from '../../../../../Redux/config';
import { ToastMsg } from '../../../../../components/Toast';
import { LoginStyles } from '../../../../auth/login/LoginStyles';
import { FloatingBackgroundCard } from '../../../../../components/card';
import { connect } from 'react-redux';
import { SignupStyles } from '../../../../auth/signup/SignupStyles';
import { FILE_BASE_URL } from '../../../../../Redux/config';
import { BankFormStyles } from '../bankDetailsForm/BankFormStyles';

const NexttextStyle = {
    fontSize: ResponsiveFont(18),
    lineHeight: ResponsiveFont(49),
}

const ContractScreen = (props) => {
    const t = useTranslation()
    const {
        downloadFile,
        loading: downloadLoading,
        error: downloadError,
        success
    } = usePdfDownloader();

    const {
        uploadFile,
        loading: uploadLoading,
        fileUrl,
        error: uploadError
    } = useFileUpload(END_POINT.fileUpload);

    const {
        apiData,
        loading: sendContractLoading,
        errors: sendContractErrors,
        request
    } = useApi();


    const [pdfUrl, setPdfUrl] = useState(null)
    const [uploadedFileURL, setUploadedFileURL] = useState(null);

    const [isModal, setIsmodal] = useState(false);


    const handleFileUpload = async () => {
        const response = await uploadFile();
        if (response?.success) {
            setUploadedFileURL(response?.fileUrl);
        }
    };

    const handleSuccessCase = async () => {
        await props.UpdateUserInfo(props.userId);
    }

    useEffect(() => {
        if (props.responseCode == 200) {
            handleSuccessCase()
        }
    }, [props.responseCode])

    useEffect(() => {
        if (props.isVerified == 5) {
            props.navigation.navigate('BottomTabNavigator');
        }
    }, [props.isVerified])

    useEffect(() => {
        if (!pdfUrl) {
            fetchPdfUrl()
        }
    }, [])

    const sendContract = async () => {
        const contractData = {
            doctorId: props.userId,
            contractURL: uploadedFileURL,
            type: "DOCTOR"
        };
        props.SendContract(contractData)
    };

    const fetchPdfUrl = async () => {
        try {
            const data = await getRequest(END_POINT.getContractUrl(props.userId));
            if (data && data?.data) {
                setPdfUrl(data.data)
            }
        } catch (err) {
            console.warn("Error fetching specializations:", err);
        }
    };

    useEffect(() => {
        if (props.contractStatus === 200) {
            ToastMsg((t('ContractUploaded')), 'bottom')
            setUploadedFileURL(null)
            ClearcontractStatus()
            props.navigation.goBack()
        }
    }, [props.contractStatus])

    const ClearcontractStatus = async () => {
        props.ClearContractStatus()
    }

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={LoginStyles.background}
            resizeMode="cover"
        >

            {/* <View style={BankFormStyles.topView}>
                <Text style={BankFormStyles.tabName}>Contract</Text>
            </View> */}
            <View style={BankFormStyles.topView}>
                <TouchableOpacity
                    style={BankFormStyles.tabNameContainer1}
                    onPress={() => props.navigation.goBack()}
                >
                    <Image
                        source={Images.back_Icon}
                        style={BankFormStyles.backIcon}
                    />
                </TouchableOpacity>
                <View style={BankFormStyles.tabNameContainer}>
                    <Text style={BankFormStyles.tabName}>Contract</Text>
                </View>
            </View>

            <FloatingBackgroundCard customStyles={BankFormStyles.bottomView} >
                <KeyboardAvoidingView
                    style={[LoginStyles.container, {
                        width: '100%'
                    }]}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={LoginStyles.scrollContainer}
                    >


                        <View style={SignupStyles.bottomView}>
                            {/* <DownloadButton
                                heading={t('SignDownloadContract')}
                                title={t('DownloadContract')}
                                onPress={() => downloadFile(FILE_BASE_URL + "" + pdfUrl)}
                                width='100%'
                                textStyle={BankFormStyles.textStyle}
                                disabled={downloadLoading || pdfUrl == null}
                            /> */}

                            <DownloadButton
                                heading={'You can download your contract from here'}
                                title={'Download your uploaded contract'}
                                onPress={() => downloadFile(FILE_BASE_URL + "" + props?.userData?.contractDoctor)}
                                width='100%'
                                textStyle={BankFormStyles.textStyle}
                                // disabled={downloadLoading || pdfUrl == null}
                            />

                            {/* <UploadFileButton
                                heading={t('UploadSignedContract')}
                                title={t('UploadContract')}
                                onPress={() => {
                                    handleFileUpload()
                                }}
                                width='100%'
                                fileurl={uploadedFileURL}

                            /> */}
                            {/* <CustomButton
                                title={t('FinishSetup')}
                                onPress={sendContract}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                textStyle={NexttextStyle}
                                width='100%'
                                disabled={uploadedFileURL ? false : true}
                            /> */}
                            <SuccessModal
                                heading={t('SignUpSuccessful')}
                                subHeading={t('welcomeToMedicineApp')}
                                isModalOpen={isModal}
                                onClose={() => {
                                    setIsmodal(false)
                                }}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </FloatingBackgroundCard>

            <Loader
                visible={
                    props.loading ||
                    downloadLoading ||
                    uploadLoading ||
                    props.updateLoading ||
                    props.contractLoading ||
                    props.userProfileUpdateLoading
                }
            />
        </ImageBackground>
    )
};



const mapStateToProps = state => {
    return {
        loading: state.bankReducer.loading,
        updateLoading: state.bankReducer.updateLoading,
        responseCode: state.bankReducer.responseCode,
        userId: state.authReducer.userId,
        authToken: state.authReducer.authToken,
        userProfileUpdateLoading: state.authReducer.updateLoading,
        userName: state.authReducer.userName,
        appLanguage: state.authReducer.appLanguage,
        contractLoading: state.ContractReducer.loading,
        contractStatus: state.ContractReducer.responseCode,
        isVerified: state.authReducer.isVerified,
        userData: state.authReducer.userData,

    };
};

const mapDispatchToProps = {
    BankFormAction,
    UpdateUserInfo,
    SendContract,
    ClearContractStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractScreen);

