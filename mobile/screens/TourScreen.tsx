import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TourHomeScreen from "./TourHomeScreen";
import TourLocationScreen from "./TourLocationScreen";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Colors from "../constants/Colors";

const TourStack = createNativeStackNavigator();

const TourScreen = () => {
  return (
    <TourStack.Navigator initialRouteName="TourHome">
      <TourStack.Screen
        name="TourHome"
        component={TourHomeScreen}
        options={({ navigation, route }) => {
          const {
            params: { tourName },
          } = route;

          return {
            title: tourName,
            headerRight: () => {
              return (
                <Pressable
                  onPress={() => navigation.navigate("Modal")}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <FontAwesome
                    name="plus-circle"
                    size={25}
                    // color={Colors[colorScheme].text}
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
              );
            },
          };
        }}
      />
      <TourStack.Screen
        name="TourLocation"
        component={TourLocationScreen}
        options={(props) => {
          return {
            title: props.route.params.tourLocationName,
          };
        }}
      />
    </TourStack.Navigator>
  );
};

export default TourScreen;
