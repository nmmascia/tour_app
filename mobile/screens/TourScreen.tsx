import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
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
                <IconButton
                  onPress={() => navigation.navigate("TourForm")}
                  name="plus-circle"
                />
              );
            },
          };
        }}
      />
      <TourStack.Screen
        name="TourHome"
        component={TourHomeScreen}
        options={({ route }) => {
          const {
            params: { tourId, tourName },
          } = route;

          return {
            title: tourName,
            headerRight: () => {
              return (
                <>
                  <IconButton
                    onPress={console.log}
                    name="times-circle"
                    color="red.500"
                  />
                  <IconButton onPress={console.log} name="plus-circle" />
                </>
              );
            },
          };
        }}
      />
      <TourStack.Screen
        name="TourLocation"
        component={TourLocationScreen}
        options={({ route }) => {
          const {
            params: { tourLocationName },
          } = route;

          return {
            title: tourLocationName,
            headerRight: () => {
              return <IconButton onPress={console.log} name="plus-circle" />;
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
