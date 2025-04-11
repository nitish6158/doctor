import { AVAILABILITY } from '../config/types';

const initialState = {
  responseCodeOfAddAvailability: null,
  responseCodeOfGetAvailability: null,
  responseCodeOfBlockAvailabilityByDate: null,
  responseCodeOfBlockAvailabilityByTimeSlot: null,
  responseCodeOfTeamAvailabilityList: null,
  responseCodeOfEditSlot: null,
  responseCodeOfDeleteSlot: null,
  responseCodeOfRestoreDate: null,
  responseCodeOfRestoreSlot: null,
  errMsg: null,
  loading: false,
  data: null,
  myAvailabilityData: null,
  blockByDateData: null,
  blockByTimeData: null,
  blockByTimeSlotData: null,
  teamAvailabilityListData: null,
  EditSlotData: null,
  DeleteSlotData: null,
  restoreDateData: null,
  restoreSlotData: null,
}

const availabilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case AVAILABILITY.ADD_AVAILABILITY_REQUEST:
      return Object.assign({}, state, {
        responseCodeOfAddAvailability: null,
        errMsg: null,
        loading: true,
        data: null,
      });
    case AVAILABILITY.ADD_AVAILABILITY_SUCCESS:
      return Object.assign({}, state, {
        responseCodeOfAddAvailability: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data: action?.payload?.data,
      });
    case AVAILABILITY.ADD_AVAILABILITY_FAIL:
      return Object.assign({}, state, {
        responseCodeOfAddAvailability: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data: null,
      });

    case AVAILABILITY.GET_AVAILABILITY_REQUEST:
      return Object.assign({}, state, {
        responseCodeOfGetAvailability: null,
        errMsg: null,
        loading: true,
        myAvailabilityData: null
      });
    case AVAILABILITY.GET_AVAILABILITY_SUCCESS:
      return Object.assign({}, state, {
        responseCodeOfGetAvailability: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        myAvailabilityData: action?.payload?.data,
      });
    case AVAILABILITY.GET_AVAILABILITY_FAIL:
      return Object.assign({}, state, {
        responseCodeOfGetAvailability: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        myAvailabilityData: null
      });

    case AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_REQUEST:
      return Object.assign({}, state, {
        responseCodeOfBlockAvailabilityByDate: null,
        errMsg: null,
        loading: true,
        blockByDateData: null
      });
    case AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_SUCCESS:
      return Object.assign({}, state, {
        responseCodeOfBlockAvailabilityByDate: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        blockByDateData: action?.payload?.data,
      });
    case AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_FAIL:
      return Object.assign({}, state, {
        responseCodeOfBlockAvailabilityByDate: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        blockByDateData: null
      });

    case AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_REQUEST:
      return Object.assign({}, state, {
        responseCodeOfBlockAvailabilityByTimeSlot: null,
        errMsg: null,
        loading: true,
        blockByTimeSlotData: null
      });
    case AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_SUCCESS:
      return Object.assign({}, state, {
        responseCodeOfBlockAvailabilityByTimeSlot: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        blockByTimeSlotData: action?.payload?.data,
      });
    case AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_FAIL:
      return Object.assign({}, state, {
        responseCodeOfBlockAvailabilityByTimeSlot: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        blockByTimeSlotData: null
      });



    case AVAILABILITY.TEAM_AVAILABILITY_LIST_REQUEST:
      return Object.assign({}, state, {
        responseCodeOfTeamAvailabilityList: null,
        errMsg: null,
        loading: true,
        teamAvailabilityListData: null
      });
    case AVAILABILITY.TEAM_AVAILABILITY_LIST_SUCCESS:
      return Object.assign({}, state, {
        responseCodeOfTeamAvailabilityList: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        teamAvailabilityListData: action?.payload?.data,
      });
    case AVAILABILITY.TEAM_AVAILABILITY_LIST_FAIL:
      return Object.assign({}, state, {
        responseCodeOfTeamAvailabilityList: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        teamAvailabilityListData: null
      });

    case AVAILABILITY.EDIT_SLOT_REQUEST:
      return Object.assign({}, state, {
        responseCodeOfEditSlot: null,
        errMsg: null,
        loading: true,
        EditSlotData: null
      });
    case AVAILABILITY.EDIT_SLOT_SUCCESS:
      return Object.assign({}, state, {
        responseCodeOfEditSlot: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        EditSlotData: action?.payload?.data,
      });
    case AVAILABILITY.EDIT_SLOT_FAIL:
      return Object.assign({}, state, {
        responseCodeOfEditSlot: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        EditSlotData: null
      });

    case AVAILABILITY.DELETE_SLOT_REQUEST:
      return Object.assign({}, state, {
        responseCodeOfDeleteSlot: null,
        errMsg: null,
        loading: true,
        DeleteSlotData: null
      });
    case AVAILABILITY.DELETE_SLOT_SUCCESS:
      return Object.assign({}, state, {
        responseCodeOfDeleteSlot: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        DeleteSlotData: action?.payload?.data,
      });
    case AVAILABILITY.DELETE_SLOT_FAIL:
      return Object.assign({}, state, {
        responseCodeOfDeleteSlot: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        DeleteSlotData: null
      });


      
      case AVAILABILITY.RESTORE_SLOT_REQUEST:
        return Object.assign({}, state, {
          responseCodeOfRestoreSlot: null,
          errMsg: null,
          loading: true,
          restoreSlotData: null
        });
      case AVAILABILITY.RESTORE_SLOT_SUCCESS:
        return Object.assign({}, state, {
          responseCodeOfRestoreSlot: action?.payload?.status,
          errMsg: action?.payload?.message,
          loading: false,
          restoreSlotData: action?.payload?.data,
        });
      case AVAILABILITY.RESTORE_SLOT_FAIL:
        return Object.assign({}, state, {
          responseCodeOfRestoreSlot: action?.payload?.status,
          errMsg: action?.payload?.message,
          loading: false,
          restoreSlotData: null
        });

    case AVAILABILITY.CLEAR_ERROR_STATUS:
      return Object.assign({}, state, {
        responseCodeOfAddAvailability: null,
        responseCodeOfGetAvailability: null,
        errMsg: null,
      });
    default:
      return state;
  }
};

export default availabilityReducer;
