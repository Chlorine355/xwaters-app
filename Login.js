import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from "react";
import {
    Dimensions,
    Image,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import * as Animatable from "react-native-animatable";
import {Icon} from "react-native-elements";
import styles from "./styles";


const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}


const getCredentials = async () => {
    try {
        const e = await AsyncStorage.getItem("email");
        const p = await AsyncStorage.getItem("password");
        // console.log(u, p);
        return [e, p]
    } catch (err) {
        // saving error
    }
}


function Login ({ navigation }) {
    let blue = "#168AEF"
    /* const [loaded] = useFonts({
      SourceSansProLight,
      SourceSansProRegular,
      SourceSansProBold,
    });

    if (!loaded || !BackgroundImage) {
      return <Text>Loading...</Text>;
    } */


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authed, setAuthed] = useState(false);


    getCredentials().then((v) => {
            setEmail(v[0]);
            setPassword(v[1]);
        }
    )

    if (email && password && !authed) {
        console.log("authing with " + email + " " + password);

        let request = new XMLHttpRequest();
        request.onreadystatechange = e => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                // console.log("ok");
                // console.log(request.response)
                setAuthed(true);
            } else {
                // console.warn(request.response, "lol");
            }
        }
        request.withCredentials = true;

        request.open('POST', 'https://x-waters.com/wp-admin/admin-ajax.php&action=ajaxlogin',);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send();
    }


    return  (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1, width: null, marginTop: -500 }}
                        source={require('./assets/background-water.jpg')}
                    />
                </View>
                <Animatable.Text
                    style={styles.titleText}
                    animation='fadeInDown'
                    delay={300}
                >
                    X-WATERS
                </Animatable.Text>
                <Animatable.Image animation='fadeInDown'
                                  delay={300} source={require('./assets/champ-logo-white-cut.png')} style={[{width: 150, height: 150, position: "absolute", top: Dimensions.get('screen').height * 0.23,alignSelf: "center"}]}/>
                <Animatable.View style={styles.bottomView} animation='fadeInUp'
                                 delay={300}>
                    {/*<Text style={styles.loginText}>Вход</Text>*/ }
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='person'
                            color='#168AEF'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Имя пользователя'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='lock'
                            type='ionicons'
                            color='#168AEF'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Пароль'
                            secureTextEntry={true}
                            autoCapitalize='none'
                        />
                    </View>
                    <Text style={styles.fpText}>Забыли пароль?</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Tabs')}>
                        <Text style={styles.loginButtonText}>Войти</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerText}>
                        <Text style={{ color: "#168AEF",fontFamily: 'Roboto',
                            fontWeight: "bold", }}>
                            {' Зарегистрироваться'}
                        </Text>
                    </Text>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );}


export default Login;