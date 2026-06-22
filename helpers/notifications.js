import Constants, { ExecutionEnvironment } from "expo-constants";
import { Platform } from "react-native";

const notificationsUnavailable =
  Platform.OS === "android" &&
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let notifications;
const emptySubscription = {
  remove: () => undefined,
};

function getNotifications() {
  if (notificationsUnavailable) {
    return null;
  }

  notifications ??= require("expo-notifications");
  return notifications;
}

export function setNotificationHandler(handler) {
  getNotifications()?.setNotificationHandler(handler);
}

export function addNotificationReceivedListener(listener) {
  return getNotifications()?.addNotificationReceivedListener(listener) ??
    emptySubscription;
}

export function addNotificationResponseReceivedListener(listener) {
  return getNotifications()
    ?.addNotificationResponseReceivedListener(listener) ?? emptySubscription;
}

export async function scheduleNotificationAsync(request) {
  return getNotifications()?.scheduleNotificationAsync(request);
}

export async function cancelAllScheduledNotificationsAsync() {
  return getNotifications()?.cancelAllScheduledNotificationsAsync();
}

export async function getAllScheduledNotificationsAsync() {
  return getNotifications()?.getAllScheduledNotificationsAsync() ?? [];
}
