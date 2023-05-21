import React, {useState} from "react";
import {Switch, Text, View} from "react-native";
import Toast from "react-native-simple-toast";
import styles from "./styles";


function More ({ navigation }) {
    const [switchVal, setSwitchVal] = useState(false);
    return  <View style={styles.tab}>


        <View style={ styles.switchRow }>
            <Text style={ {height: 20} }>Пуш-уведомления</Text>
            <Switch trackColor={ {false: '#767577', true: "#81b0ff"}}
                    thumbColor={switchVal ? '#fff' : '#f4f3f4'}
                    onValueChange={() => {setSwitchVal((prevVal) => !prevVal);
                        Toast.show(switchVal ? 'Уведомления выключены' : 'Уведомления включены', Toast.SHORT);}}
                    value={switchVal}
            ></Switch>
        </View>


    </View>;
}

export default More;