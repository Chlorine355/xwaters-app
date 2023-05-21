import {Dimensions, StyleSheet} from "react-native";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tab: {
        padding: 20,
    },
    swimScreen: {
        paddingTop: 50,
    },
    tabTitle: {
        paddingLeft: 20, paddingBottom: 20,
        fontSize: 30,
        color: "black",
        fontFamily: 'Roboto',
        fontWeight: "bold",
    },
    swims: {flexGrow: 1},
    datedesc: {
        position: "absolute",
        bottom: 20
    },
    swimListDate: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10,
        backgroundColor: '#742157',
        alignSelf: 'flex-start',
        color: "white",
        fontFamily: "Roboto"
    },
    swimListDesc: {
        // width: deviceWidth,
        fontSize: 13,
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10,
        color: "white",
        fontFamily: "Roboto",
        fontWeight: 'bold',
        backgroundColor: '#000d54'
    },
    swimListName: {
        position: "absolute",
        textAlign: 'right',
        width: 300,
        top: 20,
        right: 20,
        fontSize: 30,
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "white",
        textShadowColor: 'rgb(0, 0, 0)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10
    },
    swimListType: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10,
        backgroundColor: '#0d99d5',

        alignSelf: 'flex-start',
        color: "white",
        fontFamily: "Roboto"
    },
    swimTypes: {
        display: "flex",
        flexDirection: 'row'
    },

    swimName: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        paddingTop: 10,
        paddingHorizontal: 20,
        textAlign: "center"
    },
    swimProps: {
        paddingVertical: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    swimPropText: {
        fontSize: 20,
        paddingTop: 10,
        width: deviceWidth,
        paddingHorizontal: 25,
        // backgroundColor: '#0d99d5',
        color: "#fff",
        backgroundColor: '#0d99d540',
        textAlignVertical: 'center',
        textAlign: "center"
    },


    titleText: {
        position: 'absolute',
        top: deviceHeight * 0.13,
        alignSelf: 'center',
        color: '#fff',
        fontFamily: 'Roboto',
        fontWeight: "bold",
        fontSize: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    bottomView: {
        backgroundColor: '#fff',
        opacity: 0.95,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    loginText: {
        fontFamily: 'Roboto',
        fontSize: 24,
        marginTop: 12,
        marginBottom: 4,
    },
    inputView: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#f1f3f6',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        flex: 1,
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#168AEF',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontWeight: "bold",
        alignSelf: 'center',
        fontSize: 18,
    },
    registerText: {
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 12,
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    fpText: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontFamily: 'Roboto',
        fontWeight: "bold",
        fontSize: 16,
        color: '#168AEF',
    },
    switchRow: {flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingTop: 20},
    resName: {
        fontSize: 24,
        color: '#001380',
        fontWeight: "bold"
    },
    resDesc: {},
    backButton: {
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingLeft: 20
    },
    challengeText: {marginHorizontal: 30},
    distances: {paddingBottom: '50%',
        paddingTop: 30,
    },
    distance: {
        marginTop: 5,
        width: deviceWidth,
        height: 100,
        backgroundColor: '#00138050',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    distanceName: {
        color:"#fff",
        textTransform: "uppercase",
        fontSize: 20,
        fontWeight: "bold"
    },
    distanceSlots: {
        color:"#fff"
    }
})


export default styles;