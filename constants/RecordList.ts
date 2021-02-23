import { StyleSheet } from "react-native";

export default StyleSheet.create({
    con: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    refreshBtn: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        color: 'rgb(99, 125, 129)',
        marginRight: 24,
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        color: 'rgb(99, 125, 129)',
        marginLeft: 24,
    },
    iconPadding: {
        paddingRight: 8,
    },
    header: {
        position: 'relative',
        backgroundColor: 'rgb(255, 255, 255)',
        height: 56,
        padding: 16,
        borderBottomColor: 'rgba(0, 0, 0, .12)',
        borderBottomWidth: 1,
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        fontSize: 21,
        color: 'rgb(99, 115, 129)',
    },
    downIcon: {
        fontSize: 24,
        marginLeft: 8,
        marginTop: 3,
        color: 'rgb(99, 115, 129)',
    },
    recordList: {
        minHeight: screen.height - 68,
        backgroundColor: 'rgb(255, 255, 255)',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    recordItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recordLeft: {
        width: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    recordRight: {
        marginLeft: 8,
        flex: 1,
    },
    recordPoint: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgb(35, 178, 190)',
        marginTop: 6,
    },
    recordLine: {
        width: 4,
        height: 'calc(100% - 24px)',
        backgroundColor: 'rgb(244, 246, 248)',
        marginTop: 8,
    },
    recordTime: {
        lineHeight: 18,
        fontSize: 12,
        marginBottom: 3,
        color: 'rgb(35, 178, 190)',
    },
    recordDetail: {
        marginTop: 2,
        padding: 16,
        paddingLeft: 0,
        paddingBottom: 0,
        width: '100%',
        marginBottom: 12,
        borderRadius: 4,
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.10), 0 2px 2px 0 rgba(0,0,0,0.09), 0 1px 3px 0 rgba(0,0,0,0.16)',
    },
    lastRecord: {
        width: 4,
        height: 176,
        marginTop: 8,
    },
    recordDisease: {
        fontSize: 16,
        lineHeight: 24,
        paddingLeft: 16,
        color: 'rgba(0, 0, 0,1)'
    },
    recordTransfer: {
        fontSize: 12,
        lineHeight: 18,
        paddingLeft: 16,
        color: 'rgba(0, 0, 0, .54)'
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        with: '100%',
        paddingRight: 16,
        marginBottom: 16,
        marginTop: 46
    },

    Appointment: {
        height: 48,
        backgroundColor: 'rgba(244, 246, 248, 1)',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 24,
    },

    state: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    stateTxtIcon: {
        width: 12,
        marginTop: 18,
        marginRight: 8
    },

    stateTxt: {
        fontSize: 16,
        height: 48,
        lineHeight: 48,
        color: 'rgba(0, 0, 0, .54)',
    },

    stateSecTxt: {
        fontSize: 16,
        height: 48,
        lineHeight: 48,
        color: 'rgba(0, 0, 0, .26)',
    },

    stateActionBtn: {
        fontSize: 16,
        height: 48,
        lineHeight: 48,
        marginLeft: 8
    },

    stateActionBtnTxt: {
        lineHeight: 48,
        height: 48,
        fontSize: 16
    },
});