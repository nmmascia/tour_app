import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";
import TourFormScreen from "./TourFormScreen";
import TourHomeScreen from "./TourHomeScreen";
import TourLocationScreen from "./TourLocationScreen";
import ToursScreen from "./ToursScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const TourStack = createNativeStackNavigator();

const TourScreen = () => {
  return (
    <TourStack.Navigator initialRouteName="ToursHome">
      <TourStack.Screen
        name="Tours"
        component={ToursScreen}
        options={({ navigation }) => {
          return {
            headerRight: () => {
              return (
                <Pressable
                  onPress={() => navigation.navigate("TourForm")}
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
        options={({ navigation, route }) => {
          const {
            params: { tourLocationName },
          } = route;

          return {
            title: tourLocationName,
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
        name="TourForm"
        component={TourFormScreen}
        options={{
          title: "Create Tour",
        }}
      />
    </TourStack.Navigator>
  );
};

export default TourScreen;
