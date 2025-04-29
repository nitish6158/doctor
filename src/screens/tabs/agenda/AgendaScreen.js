import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { AgendaStyles } from './AgendaStyles';
import { FloatingBackgroundCard, ListingCard } from '../../../components/card';
import { Calendar } from 'react-native-calendars';
import { CustomButton, ToggleButton } from '../../../components/button';
import { useTranslation } from '../../../components/customhooks';
import {
    AddressInput,
    CustomDateInput,
    CustomTimeInput,
    TimePicker
} from '../../../components/input';
import { AvailabilityModal, DeleteSlotModal, EditSlotModal, Loader, BlockAvailabilityModal } from '../../../components/modal';
import {
    AddAvailabilityAction,
    getAvailabilityAction,
    RestoreDateAction,
    ClearAgendaStatus,
    BlockAvailabilityByDateAction,
    BlockAvailabilityByTimeAction,
    BlockAvailabilityByFutureTimeAction,
    TeamAvailabilityListAction,
    EditSlotAction,
    DeleteSlotAction,
    BlockAvailabilityByTimeSlotIDAction,
    RestoreSlotAction
} from '../../../Redux/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import { Fonts, Colors, ResponsiveFont, Images, opacityOfButton } from '../../../assets';
import { CustomDropdown } from '../../../components/dropdown';
import DoctorCard from './DoctorCard';
import { ToastMsg } from '../../../components/Toast';
import { AvailabilityList } from './AvailabilityList';
const buttonTextStyle1 = {
    fontFamily: Fonts.Medium,
    fontSize: ResponsiveFont(16),
    color: Colors.blue,
}
const buttonTextStyle2 = {
    fontFamily: Fonts.Medium,
    fontSize: ResponsiveFont(16),
    color: Colors.white,
}
const MyAgenda = (props) => {
    const t = useTranslation();
    const today = new Date().toISOString().split("T")[0]
    const formatDateDDMMYYYY = moment(today).format("DD-MM-YYYY");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isMyAvailabilityTabActive, setIsMyAvailabilityTabActive] = useState(true);
    const [addAvailabilityInProgress, setAddAvailabilityInProgress] = useState(false);
    const [blockAvailabilityInProgress, setBlockAvailabilityInProgress] = useState(false);
    const [weekInitialized, setWeekInitialized] = useState(false);
    const [isRemoveSlotModalVisible, setRemoveSlotModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today);
    const [addAvailabilitySelectedDate, setAddAvailabilitySelectedDate] = useState(today);
    const [selectedDateForTeamAvailability, setSelectedDateForTeamAvailability] = useState(today);
    const [isRepeat, setIsRepeat] = useState(1);
    const [isBlockByDate, setIsBlockByDate] = useState(true);
    const [selectedBlockStartDate, setSelectedBlockStartDate] = useState(formatDateDDMMYYYY)
    const [selectedBlockEndDate, setSelectedBlockEndDate] = useState(formatDateDDMMYYYY)
    const [selectedDates, setSelectedDates] = useState([today]);
    const [markedDates, setMarkedDates] = useState({
        [today]: { selected: true, selectedColor: Colors.blue }
    });

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false)

    const [editMode, setEditMode] = useState(selectedSlot?.editMode || "online")
    const [editStartTime, setEditStartTime] = useState(selectedSlot?.editStartTime)
    const [editEndTime, setEditEndTime] = useState(selectedSlot?.editEndTime)
    const [editLocation, setEditLocation] = useState(selectedSlot?.editLocation || "")
    const [isPrevMonthDisabled, setIsPrevMonthDisabled] = useState(false);


    const [slots, setSlots] = useState([
        { fromTime: '', toTime: '', type: 'online', location: '' }
    ]);
    const [clinic, setClinic] = useState({
        id: props.GlobalSelectedClinicId || 0,
        clinicName: props.GlobalSelectedClinicName || "",
    })
    const [clinicForTeam, setClinicForTeam] = useState({
        id: props.GlobalSelectedClinicId || 0,
        clinicName: props.GlobalSelectedClinicName || "",
    })
    const renderPeople = ({ item }) => <DoctorCard item={item} />;
    const updateMarkedDates = (datesArray) => {
        const marked = {};
        datesArray.forEach(date => {
            marked[date] = { selected: true, selectedColor: Colors.blue };
        });
        setMarkedDates(marked);
    };
    const [blockTimeSlotId, setBlockTimeSlotId] = useState(null);
    const [blockStartTime, setBlockStartTime] = useState('')
    const [blockEndTime, setBlockEndTime] = useState('')
    const [reason, setReason] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isBlockAvailabilityModelVisible, setIsBlockAvailabilityModelVisible] = useState(false);

    useEffect(() => {
        if (isRepeat === 1) {
            const singleDate = [addAvailabilitySelectedDate];
            setSelectedDates(singleDate);
            updateMarkedDates(singleDate);
            setWeekInitialized(false);
        } else if (isRepeat === 2) {
            // Keep current selectedDates intact when switching to Date mode
            setWeekInitialized(false);
        } else if (isRepeat === 3 && !weekInitialized) {
            const startOfWeek = moment(addAvailabilitySelectedDate);
            const weekDates = [];
            for (let i = 0; i < 7; i++) {
                weekDates.push(startOfWeek.clone().add(i, 'days').format("YYYY-MM-DD"));
            }
            setSelectedDates(weekDates);
            updateMarkedDates(weekDates);
            setWeekInitialized(true);
        }
    }, [isRepeat, addAvailabilitySelectedDate]);

    useEffect(() => {
        if (isMyAvailabilityTabActive) {
            fetchMyAvailability()
        }
        if (props.responseCodeOfAddAvailability == 200
            &&
            addAvailabilityInProgress
            && props.errMsg
        ) {
            // ToastMsg(props.errMsg, 'bottom')
            handleDiscard()
            clearResponseCode()
        }
        else if (props.errMsg && props.errMsg != null) {
            ToastMsg(props.errMsg, 'bottom')
            clearResponseCode()
        }
        if (blockAvailabilityInProgress) {
            setBlockAvailabilityInProgress(false)
        }
        if (selectedSlot) {
            setSelectedSlot(null)
            setBlockStartTime("")
            setBlockEndTime("")
            setReason("")
            setBlockTimeSlotId(null)
            setSelectedBlockStartDate(formatedDate(selectedDate))
            setSelectedBlockEndDate(formatedDate(selectedDate))
            setSelectedSlot(null)
        }

    }, [
        selectedDate,
        props?.responseCodeOfAddAvailability,
        selectedDateForTeamAvailability,
        props.responseCodeOfBlockAvailabilityByDate,
        props.responseCodeOfBlockAvailabilityByTime
    ]);

    useEffect(() => {
        if (!props.individual) {
            fetchMyTeam()
        }
    }, [selectedDateForTeamAvailability, clinicForTeam]);

    // const handleMonthChange = (month) => {
    //     setCurrentDate(new Date(month.year, month.month - 1));
    // };

    const handleMonthChange = (month) => {
        const today = new Date();
        const isCurrentMonth = month.year === today.getFullYear() && (month.month - 1) === today.getMonth();
        setIsPrevMonthDisabled(isCurrentMonth);
        setCurrentDate(new Date(month.year, month.month - 1));
    };

    const formatMonthYear = (date) => {
        const options = { month: "long", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    const formatedDate = (date) => {
        if (!date) return '';
        return moment(date).format('DD-MM-YYYY');
    };

    const fetchMyAvailability = async () => {
        const formatDate = moment(selectedDate).format("DD-MM-YYYY");
        const reqParam = {
            doctorId: props.userId,
            date: formatDate,
        };
        await props.getAvailabilityAction(reqParam)
    };

    const fetchMyAvailabilityOnDemand = async (date) => {
        const formatDate = moment(date).format("DD-MM-YYYY");
        const reqParam = {
            doctorId: props.userId,
            date: formatDate,
        };
        await props.getAvailabilityAction(reqParam)
    };

    const fetchMyTeam = async () => {
        const formatDate = moment(selectedDateForTeamAvailability).format("DD-MM-YYYY");
        const reqParam = {
            "clinicId": clinicForTeam.id,
            "doctorId": props.userId,
            "date": formatDate,
        }
        // const reqParam = {
        //     "clinicId": 46,
        //     "doctorId": 205,
        //     "date": formatDate,
        // }
        await props.TeamAvailabilityListAction(reqParam)
    };

    const handleDaySelect = (day) => {
        setSelectedDate(day.dateString);
        setSelectedBlockStartDate(formatedDate(selectedDate))
        setSelectedBlockEndDate(formatedDate(selectedDate))
        setBlockStartTime("")
        setBlockEndTime("")
        setReason("")
        setBlockTimeSlotId(null)
        setSelectedSlot(null)
    };

    const handleDaySelectForTeamAvailability = (day) => {
        setSelectedDateForTeamAvailability(day.dateString);
    };

    const handleAddAvailabilityDaySelect = (day) => {

        const dateStr = day.dateString;

        if (isRepeat === 1) {
            setSelectedDates([dateStr]);
            updateMarkedDates([dateStr]);
        } else if (isRepeat === 2 || isRepeat === 3) {
            setSelectedDates(prev => {
                let updated = [...prev];

                if (updated.includes(dateStr)) {
                    updated = updated.filter(d => d !== dateStr);
                } else {
                    updated.push(dateStr);
                }

                updateMarkedDates(updated);
                return updated;
            });
        }

        setAddAvailabilitySelectedDate(dateStr);
    };

    const calenderTheme = {
        arrowColor: Colors.blue,
        monthTextColor: "black",
        backgroundColor: Colors.white,
        calendarBackground: Colors.white,
        textSectionTitleColor: Colors.black,
        selectedDayBackgroundColor: Colors.blue,
        selectedDayTextColor: Colors.white,
        todayTextColor: Colors.blue,
        dayTextColor: Colors.black,
        textDisabledColor: '#d9d9d9',
        dotColor: Colors.blue,
        selectedDotColor: Colors.white,
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 14,
    };

    const renderHeader = (date) => (
        <Text style={AgendaStyles.monthName}>
            {formatMonthYear(new Date(date))}
        </Text>
    );

    const renderArrow = (direction) => (
        <Text style={AgendaStyles.arrow}>
            {direction === "left" ? "<" : ">"}
        </Text>
    );

    const handleAddAvailability = async () => {
        const dateArray = selectedDates.map(date => moment(date).format("DD-MM-YYYY"));
        const timeSlots = slots.map(slot => ({
            fromTime: slot.fromTime,
            toTime: slot.toTime,
            type: slot.type.toUpperCase(),
            location: slot.type === 'offline' ? slot.location : ''
        }))
        const invalidSlot = slots.find(
            slot =>
                !slot.fromTime?.trim() ||
                !slot.toTime?.trim() ||
                (slot.type === 'offline' && !slot.location?.trim())
        );
        if (timeSlots.length == 0) {
            ToastMsg(t('AddTimeSlotsFirst'), "bottom");
            return;
        }

        if (invalidSlot) {
            ToastMsg(t('CompleteTimeSlotsFirst'), "bottom");
            return;
        }


        const formatCreatedByClinic = clinic.id != 0 ? 2 : 0
        const reqParam = {
            clinicId: clinic.id,
            doctorId: props.userId,
            repeatForWeek: isRepeat === 3 ? 1 : 0,
            dateArray: dateArray,
            timeSlots: timeSlots,
            createdByClinic: formatCreatedByClinic
        };
        console.log(reqParam)
        await props.AddAvailabilityAction(reqParam);
    };

    const updateSlot = (index, key, value) => {
        const updatedSlots = [...slots];
        updatedSlots[index][key] = value;
        setSlots(updatedSlots);
    };

    const add15Minutes = (time) => {
        if (!time || !time.includes(":")) return "";

        const [hour, minute] = time.split(":").map(Number);
        if (isNaN(hour) || isNaN(minute)) return "";

        const start = new Date();
        start.setHours(hour);
        start.setMinutes(minute + 15); // Add 15 mins

        const hh = String(start.getHours()).padStart(2, "0");
        const mm = String(start.getMinutes()).padStart(2, "0");
        return `${hh}:${mm}`;
    };

    const handleDiscard = () => {
        setAddAvailabilityInProgress(false);
        setIsRepeat(1);
        setSlots(
            [
                { fromTime: '', toTime: '', type: 'online', location: '' }
            ]
        )

    };

    const clearResponseCode = async () => {
        await props.ClearAgendaStatus();
    }

    const handleBlockDate = async () => {
        const reqParam = {
            "doctorId": props.userId,
            "fromDate": selectedBlockStartDate,
            "toDate": selectedBlockEndDate,
            "reason": reason
        };
        console.log(reqParam)
        await props.BlockAvailabilityByDateAction(reqParam);
    }

    const handleBlockTime = async () => {
        const reqParam = {
            "doctorId": props.userId,
            "date": selectedBlockStartDate,
            "reason": reason,
            "fromTime": blockStartTime,
            "toTime": blockEndTime,
        };
        console.log(reqParam)
        await props.BlockAvailabilityByFutureTimeAction(reqParam);
    }

    useEffect(() => {
        if (props.responseCodeOfBlockAvailabilityByTimeSlotId == 200
            ||
            props.responseCodeOfBlockAvailabilityByDate == 200) {
            setBlockAvailabilityInProgress(false)
            setIsBlockByDate(true);
            setBlockStartTime("")
            setBlockEndTime("")
            setReason("")
            setBlockTimeSlotId(null)
            setSelectedBlockStartDate(formatedDate(selectedDate))
            setSelectedBlockEndDate(formatedDate(selectedDate))
            setSelectedSlot(null)
            fetchMyAvailabilityOnDemand(selectedDate)
        }
        if (
            (props.responseCodeOfRestoreSlot && props.responseCodeOfRestoreSlot == 200)
            ||
            (props.responseCodeOfEditSlot && props.responseCodeOfEditSlot == 200)
            ||
            (props.responseCodeOfDeleteSlot && props.responseCodeOfDeleteSlot == 200)
            ||
            (props.responseCodeOfRestoreDate && props.responseCodeOfRestoreDate == 200)
        ) {
            setSelectedSlot(null)
            fetchMyAvailabilityOnDemand(selectedDate)
            setEditModalOpen(false)
            setRemoveSlotModalVisible(false)
            clearResponseCode();
        } else if (props.errMsg != null) {
            // ToastMsg(props.errMsg, 'bottom')
            clearResponseCode();

        }
    }, [
        props.responseCodeOfBlockAvailabilityByTimeSlotId,
        props.responseCodeOfRestoreSlot,
        props.responseCodeOfEditSlot,
        props.responseCodeOfDeleteSlot,
        props.responseCodeOfRestoreDate,

    ])


    useEffect(() => {
        console.log(selectedSlot)
        const formatDate = moment(selectedDate).format("DD-MM-YYYY");
        setSelectedBlockStartDate(formatDate);
        setSelectedBlockEndDate(formatDate);
        setAddAvailabilitySelectedDate(selectedDate)
        if (selectedSlot) {
            setIsBlockByDate(false)
            setBlockTimeSlotId(selectedSlot.timeSlotId)
            setSelectedBlockStartDate(selectedSlot.date)
            setSelectedBlockEndDate(selectedSlot.date)
            setBlockStartTime(selectedSlot?.startTime);
            setBlockEndTime(selectedSlot?.endTime)
        }
    }, [selectedSlot, selectedDate])
    const onCloseBlockAvailability = () => {

        const formatDate = moment(selectedDate).format("DD-MM-YYYY");
        setSelectedBlockStartDate(formatDate);
        setSelectedBlockEndDate(formatDate);


        setBlockAvailabilityInProgress(false)
        setIsBlockByDate(true);
        setSelectedBlockStartDate(formatDateDDMMYYYY)
        setSelectedBlockEndDate(formatDateDDMMYYYY)
        setBlockStartTime("")
        setBlockEndTime("")
        setReason("")
    }
    const onEditPress = (slot) => {
        if (!slot) {
            ToastMsg(t('SelectValidSlot'), "bottom");
            return;
        }
        setSelectedSlot(slot);
        setEditMode(slot.mode)
        setEditStartTime(slot.startTime)
        setEditEndTime(slot.endTime)
        setEditLocation(slot.location)
        setEditModalOpen(true);
    };
    const onPressRestoreByDate = async () => {
        const formatDate = moment(selectedDate).format("DD-MM-YYYY");
        const reqParam = {
            "doctorId": props.userId,
            "date": formatDate,
        }
        await props.RestoreDateAction(reqParam)
    };
    const onDeletePress = (slot) => {
        if (!slot) {
            ToastMsg(t('SelectSlotToDelete'), "bottom");
            return;
        }

        setSelectedSlot(slot); // in case you want to store for confirmation
        setRemoveSlotModalVisible(true);
    };
    const onConfirmDelete = async (data) => {
        if (!selectedSlot) {
            ToastMsg(t('NoSlotSelectedForDeletion'), "bottom");
            return;
        }
        const reqParam = {
            "clinicId": data.clinicId,
            "doctorId": props.userId,
            "timeSlotId": data.timeSlotId,
            "date": data.date,
            "fromTime": data.startTime,
            "toTime": data.endTime,
            "location": data.location,
            "mode": data.mode
        }
        console.log(reqParam)
        setRemoveSlotModalVisible(false)
        setSelectedSlot(null)
        await props.DeleteSlotAction(reqParam);
        // setRemoveSlotModalVisible(false);
    };
    const onPressUpdateSlot = async (data) => {
        console.log(data, "data")

        const reqParam = {
            "clinicId": data.clinicId,
            "doctorId": props.userId,
            "timeSlotId": data.timeSlotId,
            "date": data.date,
            "fromTime": data.startTime,
            "toTime": data.endTime,
            "location": data.location,
            "mode": data.mode
        }
        await props.EditSlotAction(reqParam);
    };
    const onRestorePress = async (data) => {
        await props.RestoreSlotAction(data.timeSlotId);
    };
    const onBlockPress = async () => {
        const reqParam = {
            "date": selectedBlockStartDate,
            "doctorID": props.userId,
            "timeSlotId": blockTimeSlotId,
        }
        console.log(reqParam, "data")
        await props.BlockAvailabilityByTimeSlotIDAction(reqParam);
    };

    const onCloseBlockAvailabilityModal = () => {
        setBlockAvailabilityInProgress(false)
        setIsBlockByDate(true);
        setSelectedBlockStartDate(formatedDate(selectedDate))
        setSelectedBlockEndDate(formatedDate(selectedDate))
        setBlockStartTime("")
        setBlockEndTime("")
        setReason("")
        setBlockTimeSlotId(null)
        setSelectedSlot(null)
    }

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={AgendaStyles.background}
            resizeMode="cover"
        >


            <>
                <View style={AgendaStyles.topView}>

                    {!addAvailabilityInProgress ?
                        <>
                            <TouchableOpacity
                                style={AgendaStyles.tabNameContainer1}
                                onPress={() => props.navigation.goBack()}>
                                <Image
                                    source={Images.back_Icon}
                                    style={AgendaStyles.backIcon}
                                />
                            </TouchableOpacity>
                            <View style={AgendaStyles.tabNameContainer}>
                                <Text style={AgendaStyles.tabName}>{t('MyAgenda')}</Text>
                            </View>
                        </>
                        :
                        <TouchableOpacity
                            style={AgendaStyles.crossButtonContainer}
                            onPress={() => { handleDiscard() }}
                        >
                            <Image
                                source={Images.icon_cross}
                                style={AgendaStyles.iconStyle}
                            />
                        </TouchableOpacity>
                    }
                </View>

                <FloatingBackgroundCard customStyles={AgendaStyles.bottomView}>
                    <KeyboardAvoidingView
                        style={[AgendaStyles.keyBoardcontainer, {
                            width: '100%',
                            paddingVertical: "5%",
                        }]}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <ScrollView
                            style={{ flex: 1, width: '100%', }}
                            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                        >
                            {
                                !props.individual && !addAvailabilityInProgress &&
                                <ToggleButton
                                    isActive={isMyAvailabilityTabActive}
                                    onToggle={setIsMyAvailabilityTabActive}
                                    leftText={t('MyAvailability')}
                                    rightText={t('TeamAvailability')}
                                />
                            }

                            {addAvailabilityInProgress &&
                                <View>
                                    <Text
                                        style={AgendaStyles.availabilityStyle

                                        }>{t('AddAvailability')}</Text>
                                </View>
                            }


                            {isMyAvailabilityTabActive && !addAvailabilityInProgress &&
                                <View style={{ width: '90%', }}>
                                    <Calendar
                                        renderHeader={renderHeader}
                                        renderArrow={renderArrow}
                                        style={AgendaStyles.calenderStyle}
                                        theme={calenderTheme}
                                        onMonthChange={handleMonthChange}
                                        current={selectedDate}
                                        onDayPress={handleDaySelect}
                                        minDate={new Date().toISOString().split('T')[0]} // Prevent past date selection
                                        disableArrowLeft={isPrevMonthDisabled}
                                        markedDates={{
                                            [selectedDate]:
                                                { selected: true, selectedColor: Colors.blue }
                                        }}
                                    />
                                </View>
                            }
                            {isMyAvailabilityTabActive &&
                                <>

                                    {!addAvailabilityInProgress &&
                                        <>
                                            {props.myAvailabilityData ?
                                                <>
                                                    {
                                                        props.myAvailabilityData?.isBlockedByDay ?
                                                            <ListingCard customStyles={AgendaStyles.BlockedContainer}>
                                                                <Image
                                                                    source={
                                                                        Images.AvailabilityTimeBlocked
                                                                    }
                                                                    style={AgendaStyles.BlockAvailabiltyIcon}

                                                                />
                                                                <Text style={AgendaStyles.TextBlockAvailability}>
                                                                    {t('BlockedAvailabilityForDate')}
                                                                </Text>
                                                                <TouchableOpacity
                                                                    onPress={() => { onPressRestoreByDate() }}
                                                                    style={AgendaStyles.restoreDate}
                                                                >
                                                                    <Text style={AgendaStyles.restoreTextdate}>{t('Restore')}</Text>
                                                                </TouchableOpacity>
                                                            </ListingCard>
                                                            :
                                                            <>
                                                                {
                                                                    props.myAvailabilityData.onlineSlots?.length == 0
                                                                        &&
                                                                        props.myAvailabilityData.offlineSlots?.length == 0

                                                                        ?
                                                                        <View
                                                                            style={AgendaStyles.NoAvailabilityContainer2} >
                                                                            <Image
                                                                                source={Images.NoAvailability}
                                                                                style={AgendaStyles.NoAvailability}
                                                                            />
                                                                            <Text
                                                                                style={AgendaStyles.NoAvailabilityText}
                                                                            >{t('NoAvailabilityAdded')}</Text>
                                                                        </View>
                                                                        :
                                                                        <>
                                                                            {
                                                                                props.myAvailabilityData?.onlineSlots &&
                                                                                <AvailabilityList
                                                                                    type="online"
                                                                                    slots={props.myAvailabilityData.onlineSlots}
                                                                                    date={props.myAvailabilityData.date}
                                                                                    selectedSlot={selectedSlot}
                                                                                    setSelectedSlot={setSelectedSlot}
                                                                                    onDeletePress={onDeletePress}
                                                                                    onEditPress={onEditPress}
                                                                                    onRestorePress={onRestorePress}
                                                                                />
                                                                            }
                                                                            {
                                                                                props.myAvailabilityData?.offlineSlots &&
                                                                                <AvailabilityList
                                                                                    type="offline"
                                                                                    slots={props.myAvailabilityData.offlineSlots}
                                                                                    date={props.myAvailabilityData.date}
                                                                                    selectedSlot={selectedSlot}
                                                                                    setSelectedSlot={setSelectedSlot}
                                                                                    onDeletePress={onDeletePress}
                                                                                    onEditPress={onEditPress}
                                                                                    onRestorePress={onRestorePress}
                                                                                />
                                                                            }
                                                                        </>


                                                                }
                                                            </>
                                                    }

                                                </>
                                                :
                                                <View
                                                    style={AgendaStyles.NoAvailabilityContainer} >
                                                    <Image
                                                        source={Images.NoAvailability}
                                                        style={AgendaStyles.NoAvailability}
                                                    />
                                                    <Text
                                                        style={AgendaStyles.NoAvailabilityText}
                                                    >{t('NoAvailabilityAdded')}</Text>
                                                </View>
                                            }
                                            {props?.myAvailabilityData?.onlineSlots?.length > 0
                                                ||
                                                props?.myAvailabilityData?.offlineSlots?.length > 0 ?
                                                <View
                                                    style={AgendaStyles.availabilityButton} >
                                                    <CustomButton
                                                        title={t('BlockAvailability')}
                                                        textStyle={buttonTextStyle1}
                                                        width='48%'
                                                        onPress={() => { setBlockAvailabilityInProgress(true) }}
                                                        backgroundColor={Colors.lightblue6}
                                                    />
                                                    <CustomButton
                                                        title={t('AddAvailability')}
                                                        width='48%'
                                                        textStyle={buttonTextStyle2}
                                                        onPress={() => { setAddAvailabilityInProgress(true) }}
                                                    />
                                                </View>
                                                :
                                                <CustomButton
                                                    title={t('AddAvailability')}
                                                    width='90%'
                                                    textStyle={buttonTextStyle2}
                                                    onPress={() => { setAddAvailabilityInProgress(true) }}
                                                />
                                            }
                                        </>

                                    }

                                    {addAvailabilityInProgress &&
                                        <>
                                            {!props.individual &&

                                                <View style={{ width: '100%', alignItems: 'center', marginVertical: '2%' }}>
                                                    <CustomDropdown
                                                        heading={t('SelectClinic')}
                                                        placeholder={
                                                            clinic?.clinicName || 'Select Clinic'
                                                        }
                                                        selectedValue={clinic?.clinicName}
                                                        onValueChange={setClinic}
                                                        options={[{ id: 0, clinicName: 'Self' }, ...(props?.allClinics || [])]}
                                                        width='90%'
                                                        type="clinic"
                                                    />
                                                </View>
                                            }
                                            <View style={{ width: '90%', }}>
                                                <Calendar
                                                    renderHeader={renderHeader}
                                                    renderArrow={renderArrow}
                                                    style={AgendaStyles.calenderStyle}
                                                    theme={calenderTheme}
                                                    onMonthChange={handleMonthChange}
                                                    current={addAvailabilitySelectedDate}
                                                    onDayPress={handleAddAvailabilityDaySelect}
                                                    minDate={new Date().toISOString().split('T')[0]} // Prevent past date selection
                                                    disableArrowLeft={isPrevMonthDisabled}

                                                    markedDates={markedDates}
                                                />
                                            </View>
                                            <View style={AgendaStyles.heading3}>
                                                <Text style={AgendaStyles.slotText2}>{t('SelectRepeat')}</Text>
                                                <View style={AgendaStyles.modeContainer}>
                                                    <TouchableOpacity
                                                        style={[AgendaStyles.modeButton2, {
                                                            marginHorizontal: '0%',
                                                            backgroundColor: isRepeat == 1 ? Colors.blue : Colors.white
                                                        }]}
                                                        onPress={() => { setIsRepeat(1) }}

                                                    >
                                                        <Text
                                                            style={[AgendaStyles.modeText2,
                                                            { color: isRepeat == 1 ? Colors.white : Colors.blue }]}
                                                        >{t('NoRepeat')}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={[AgendaStyles.modeButton2, {
                                                            backgroundColor: isRepeat == 2 ? Colors.blue : Colors.white,
                                                            marginLeft: '2%'
                                                        }]}
                                                        onPress={() => { setIsRepeat(2) }}
                                                    >
                                                        <Text
                                                            style={[AgendaStyles.modeText2, {
                                                                color: isRepeat == 2 ?
                                                                    Colors.white :
                                                                    Colors.blue
                                                            }]}
                                                        >{t('Date')}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={[AgendaStyles.modeButton2, {
                                                            backgroundColor: isRepeat == 3 ? Colors.blue : Colors.white,
                                                            marginLeft: '2%'
                                                        }]}
                                                        onPress={() => { setIsRepeat(3) }}
                                                    >
                                                        <Text
                                                            style={[AgendaStyles.modeText2, {
                                                                color: isRepeat == 3 ?
                                                                    Colors.white : Colors.blue
                                                            }]}
                                                        >{t('Week')}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>


                                            <View style={AgendaStyles.heading2}>
                                                <Text style={AgendaStyles.slotText2}>{t('TimeSlot')}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSlots([...slots, {
                                                            fromTime: '',
                                                            toTime: '',
                                                            type: 'online',
                                                            location: ''
                                                        }]);
                                                    }}
                                                >
                                                    <Image
                                                        source={Images.icon_plus}
                                                        style={AgendaStyles.iconStyle}
                                                    />
                                                </TouchableOpacity>

                                            </View>

                                            {slots.map((slot, index) => (
                                                <ListingCard key={index} customStyles={{ width: '90%' }}>
                                                    <View style={AgendaStyles.cardContainer}>

                                                        <View style={AgendaStyles.heading}>
                                                            <Text style={AgendaStyles.slotText}>Time Slot {index + 1}</Text>
                                                            <TouchableOpacity onPress={() => {
                                                                const updated = [...slots];
                                                                updated.splice(index, 1);
                                                                setSlots(updated);
                                                            }}>
                                                                <Image source={Images.icon_delete} style={AgendaStyles.iconStyle} />
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={AgendaStyles.modeContainer}>
                                                            <TouchableOpacity
                                                                style={[AgendaStyles.modeButton, {
                                                                    marginHorizontal: '0%',
                                                                    backgroundColor: slot.type === 'online' ? Colors.blue : Colors.white
                                                                }]}
                                                                onPress={() => updateSlot(index, 'type', 'online')}
                                                            >
                                                                <Text style={[AgendaStyles.modeText,
                                                                { color: slot.type === 'online' ? Colors.white : Colors.blue }]}>
                                                                    {t('Online')}
                                                                </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={[AgendaStyles.modeButton, {
                                                                    backgroundColor: slot.type === 'offline' ? Colors.blue : Colors.white
                                                                }]}
                                                                onPress={() => updateSlot(index, 'type', 'offline')}
                                                            >
                                                                <Text style={[AgendaStyles.modeText,
                                                                { color: slot.type === 'offline' ? Colors.white : Colors.blue }]}>
                                                                    {t('Offline')}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={AgendaStyles.slotContainer}>
                                                            {/* <CustomTimeInput
                                                                    placeholder="From HH:MM"
                                                                    onTimeChange={(time) => {
                                                                        updateSlot(index, 'fromTime', time);
                                                                        const calculatedToTime = add15Minutes(time);
                                                                        updateSlot(index, 'toTime', calculatedToTime);
                                                                    }}
                                                                    value={slot.fromTime}
                                                                /> */}
                                                            {/* <CustomTimeInput
                                                                    placeholder="To HH:MM"
                                                                    onTimeChange={(time) => updateSlot(index, 'toTime', time)}
                                                                    value={slot.toTime}
                                                                    editable={false} // disables the input
                                                                /> */}

                                                            <TimePicker
                                                                value={slot.fromTime}
                                                                onChange={(time) => {
                                                                    updateSlot(index, 'fromTime', time);
                                                                    const calculatedToTime = add15Minutes(time);
                                                                    updateSlot(index, 'toTime', calculatedToTime);
                                                                }}
                                                                label={t('FromTime')}
                                                            />


                                                            <TimePicker
                                                                value={slot.toTime}
                                                                onChange={(time) => {
                                                                    updateSlot(index, 'toTime', time);
                                                                }}
                                                                label={t('ToTime')}
                                                                minTime={slot.fromTime}
                                                            />
                                                        </View>

                                                        {slot.type === 'offline' && (
                                                            <View style={AgendaStyles.addressContainer4}>
                                                                <AddressInput
                                                                    heading={t('Address')}
                                                                    placeholder={t('EnterAddress')}
                                                                    value={slot.location}
                                                                    onChangeText={(text) => updateSlot(index, 'location', text)}
                                                                    width='100%'
                                                                />
                                                            </View>
                                                        )}
                                                    </View>
                                                </ListingCard>
                                            ))}


                                            <View
                                                style={AgendaStyles.availabilityButton2}
                                            >
                                                <CustomButton
                                                    title={t('AddAvailability')}
                                                    width='90%'
                                                    onPress={() => { handleAddAvailability() }}
                                                />
                                            </View>
                                        </>
                                    }


                                </>
                            }

                            {!isMyAvailabilityTabActive &&
                                <>
                                    <View style={{ width: '100%', alignItems: 'center', marginVertical: '2%' }}>
                                        <CustomDropdown
                                            heading={t('SelectClinic')}
                                            placeholder={
                                                clinicForTeam?.clinicName || 'Select Clinic'
                                            }
                                            selectedValue={clinicForTeam?.clinicName}
                                            onValueChange={setClinicForTeam}
                                            options={props?.allClinics || []}
                                            width='90%'
                                            type="clinic"
                                        />
                                    </View>

                                    <View style={{ width: '90%', }}>
                                        <Calendar
                                            renderHeader={renderHeader}
                                            renderArrow={renderArrow}
                                            style={AgendaStyles.calenderStyle}
                                            theme={calenderTheme}
                                            onMonthChange={handleMonthChange}
                                            current={selectedDateForTeamAvailability}
                                            onDayPress={handleDaySelectForTeamAvailability}
                                            minDate={new Date().toISOString().split('T')[0]} // Prevent past date selection
                                            disableArrowLeft={isPrevMonthDisabled}

                                            markedDates={{
                                                [selectedDateForTeamAvailability]:
                                                {
                                                    selected: true,
                                                    selectedColor: Colors.blue
                                                }
                                            }}
                                        />
                                    </View>
                                    {
                                        props?.teamAvailabilityListData
                                            &&
                                            props?.teamAvailabilityListData?.length > 0
                                            ?
                                            <View style={AgendaStyles.listContainer}>
                                                <FlatList
                                                    data={props.teamAvailabilityListData}
                                                    keyExtractor={(item) => item.id}
                                                    renderItem={renderPeople}
                                                    scrollEnabled={false}
                                                    contentContainerStyle={{
                                                        paddingBottom: '10%',
                                                    }}
                                                    showsVerticalScrollIndicator={false}
                                                />
                                            </View>
                                            :
                                            <View style={AgendaStyles.NoDataFoundContainer}>
                                                <Image
                                                    source={Images.nodatafound}
                                                    style={AgendaStyles.NoDataFound}
                                                />
                                            </View>
                                    }
                                </>
                            }
                        </ScrollView>
                    </KeyboardAvoidingView>
                </FloatingBackgroundCard>
            </>


            <AvailabilityModal
                heading={t('AvailabilityAdded')}
                isModalOpen={isModalVisible}
                onClose={() => {
                    setIsModalVisible(false)
                }}
            />

            <AvailabilityModal
                heading={t('AvailabilityBlocked')}
                isModalOpen={isBlockAvailabilityModelVisible}
                onClose={() => {
                    setIsBlockAvailabilityModelVisible(false)
                }}
                type={'blockImage'}
            // blockImage={true}
            />

            <Loader
                visible={props.loading}
            />

            <DeleteSlotModal
                isModalOpen={isRemoveSlotModalVisible}
                onClose={() => {
                    setRemoveSlotModalVisible(false)
                    setSelectedSlot(null)
                }}
                onConfirmDelete={onConfirmDelete}
                selectedSlot={selectedSlot}
            />

            <EditSlotModal
                visible={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false)
                    setSelectedSlot(null)
                }}
                selectedSlot={selectedSlot}
                onPressUpdateSlot={onPressUpdateSlot}
                editMode={editMode}
                setEditMode={setEditMode}
                editStartTime={editStartTime}
                setEditStartTime={setEditStartTime}
                editEndTime={editEndTime}
                setEditEndTime={setEditEndTime}
                editLocation={editLocation}
                setEditLocation={setEditLocation}
            />
            <BlockAvailabilityModal
                visible={blockAvailabilityInProgress}
                onCloseBlockAvailabilityModal={onCloseBlockAvailabilityModal}
                isBlockByDate={isBlockByDate}
                setIsBlockByDate={setIsBlockByDate}
                formatDateDDMMYYYY={formatDateDDMMYYYY}
                selectedBlockStartDate={selectedBlockStartDate}
                setSelectedBlockStartDate={setSelectedBlockStartDate}
                selectedBlockEndDate={selectedBlockEndDate}
                setSelectedBlockEndDate={setSelectedBlockEndDate}
                blockStartTime={blockStartTime}
                setBlockStartTime={setBlockStartTime}
                setBlockEndTime={setBlockEndTime}
                blockEndTime={blockEndTime}
                reason={reason}
                setReason={setReason}
                handleBlockDate={handleBlockDate}
                onBlockPress={onBlockPress}
            />
            {/* <CustomDateInput
                placeholder={t('FromDate')}
                value={selectedBlockStartDate}
                onDateChange={setSelectedBlockStartDate}
                minimumDate={new Date()} // optional
                icon="calender"
            /> */}
        </ImageBackground >
    );
};


const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        individual: state.authReducer.individual,
        // individual: false,
        // allClinics: localclinic,
        allClinics: state.getAllClinicReducer.data,
        availabilityAddedData: state.availabilityReducer.data,
        loading: state.availabilityReducer.loading,
        errMsg: state.availabilityReducer.errMsg,
        myAvailabilityData: state.availabilityReducer.myAvailabilityData,
        responseCodeOfAddAvailability: state.availabilityReducer.responseCodeOfAddAvailability,
        responseCodeOfGetAvailability: state.availabilityReducer.responseCodeOfGetAvailability,
        responseCodeOfBlockAvailabilityByDate: state.availabilityReducer.responseCodeOfBlockAvailabilityByDate,
        responseCodeOfBlockAvailabilityByTime: state.availabilityReducer.responseCodeOfBlockAvailabilityByTime,
        responseCodeOfBlockAvailabilityByTimeSlotId: state.availabilityReducer.responseCodeOfBlockAvailabilityByTimeSlotId,
        responseCodeOfTeamAvailabilityList: state.availabilityReducer.responseCodeOfTeamAvailabilityList,
        responseCodeOfRestoreDate: state.availabilityReducer.responseCodeOfRestoreDate,
        responseCodeOfRestoreSlot: state.availabilityReducer.responseCodeOfRestoreSlot,
        responseCodeOfEditSlot: state.availabilityReducer.responseCodeOfEditSlot,
        responseCodeOfDeleteSlot: state.availabilityReducer.responseCodeOfDeleteSlot,
        teamAvailabilityListData: state.availabilityReducer.teamAvailabilityListData,
        GlobalSelectedClinicId: state.authReducer.selectedClinicId,
        GlobalSelectedClinicName: state.authReducer.selectedClinicName,
    };
};


const mapDispatchToProps = {
    AddAvailabilityAction,
    getAvailabilityAction,
    BlockAvailabilityByDateAction,
    // BlockAvailabilityByTimeAction,
    TeamAvailabilityListAction,
    ClearAgendaStatus,
    EditSlotAction,
    DeleteSlotAction,
    BlockAvailabilityByFutureTimeAction,
    BlockAvailabilityByTimeSlotIDAction,
    RestoreSlotAction,
    RestoreDateAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAgenda);

const localclinic = [
    {
        "id": '1',
        "clinicName": 'CHL',

    },
    {
        "id": '2',
        "clinicName": 'bHL',

    },
    {
        "id": '3',
        "clinicName": 'ChghgL',

    },
    {
        "id": '5',
        "clinicName": 'CsdsddHL',

    },
]