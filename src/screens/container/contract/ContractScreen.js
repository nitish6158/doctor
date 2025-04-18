import {
    useState,
    useMemo,
    useEffect,
} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import {
    CustomTextInput,
    AddressInput
} from '../../../components/input';
import {
    ResponsiveFont,
    Colors,
    Images,
    WindowWidth as wp
} from '../../../assets';
import {
    CustomButton,
    UploadFileButton,
    DownloadButton
} from '../../../components/button';
import { ProgressBar } from 'react-native-paper';
import {
    SuccessModal,
    Loader
} from '../../../components/modal';
import {
    BankFormAction,
    UpdateUserInfo,
    SendContract,
    ClearContractStatus
} from '../../../Redux/actions';
import {
    useTranslation,
    usePdfDownloader,
    useFileUpload,
    useApi
} from '../../../components/customhooks';
import {
    validateEmail,
    validatePhoneNumber,
} from '../../../utility/Validator';
import { getRequest } from '../../../Redux/config';
import { END_POINT } from '../../../Redux/config';
import { ToastMsg } from '../../../components/Toast';
import { LoginStyles } from '../../auth/login/LoginStyles';
import { FloatingBackgroundCard } from '../../../components/card';
import { connect } from 'react-redux';
import { BankFormStyles } from '../bankDetailsForm/BankFormStyles';
import { SignupStyles } from '../../auth/signup/SignupStyles';
import { FILE_BASE_URL } from '../../../Redux/config';

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
        props.navigation.navigate('BottomTabNavigator');
    }

    useEffect(() => {
        if (props.responseCode == 200) {
            handleSuccessCase()
        }
    }, [props.responseCode])

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

            <View style={BankFormStyles.topView}>
                <Text style={BankFormStyles.tabName}>Submit the signed Contract</Text>
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



                            <DownloadButton
                                heading={t('SignDownloadContract')}
                                title={t('DownloadContract')}
                                onPress={() => downloadFile(FILE_BASE_URL+""+pdfUrl)}
                                width='100%'
                                textStyle={BankFormStyles.textStyle}
                                disabled={downloadLoading || pdfUrl==null}                            />

                            <UploadFileButton
                                heading={t('UploadSignedContract')}
                                title={t('UploadContract')}
                                onPress={() => {
                                    handleFileUpload()
                                }}
                                width='100%'
                                fileurl={uploadedFileURL}

                            />



                            <CustomButton
                                title={t('FinishSetup')}

                                onPress={sendContract}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                textStyle={NexttextStyle}
                                width='100%'
                                disabled={uploadedFileURL ? false : true}
                            />
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
                    props.contractLoading
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
        userName: state.authReducer.userName,
        appLanguage: state.authReducer.appLanguage,

        contractLoading: state.ContractReducer.loading,
        contractStatus: state.ContractReducer.responseCode,


    };
};

const mapDispatchToProps = {
    BankFormAction,
    UpdateUserInfo,
    SendContract,
    ClearContractStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractScreen);

