import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  IconButton,
  useTheme,
  Portal,
  Button,
  Dialog,
  TextInput,
} from "react-native-paper";
import KeyboardButton from "./KeyboardButton";
import ScrollView from "./ScrollView";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { magic } from "../helpers/ExpressionHelper";
import { PropTypes } from "prop-types";

export default function NewSubject({ route, navigation }) {
  const type = route.params.type;
  const meanExpression =
    type == "editMean"
      ? route.params.task.mean || ""
      : route.params.task.frequency || "";

  const [meanDict, setMeanDict] = useState(
    type == "editMean"
      ? route.params.task.grade.mean || magic({}, meanExpression).dict
      : route.params.task.grade.frequency || magic({}, meanExpression).dict
  );

  const [meanExpressionArray, setMeanExpressionArray] = useState([]);

  const { colors } = useTheme();
  const operators = ["+", "-", "/", "*", "(", ")"];
  const [isDialogVariableOpen, setIsDialogVariableOpen] = useState(false);
  const [newVariableName, setNewVariableName] = useState("");

  const [isDialogValueOpen, setIsDialogValueOpen] = useState(false);
  const [newValue, setNewValue] = useState("");

  function handleVariableCreation() {
    setIsDialogVariableOpen(false);
    const auxMeanDict = { ...meanDict };
    auxMeanDict[newVariableName] = "";
    setMeanDict({ ...auxMeanDict });
    setNewVariableName("");
  }

  function handleVariableChange(variable, value) {
    const auxMeanDict = { ...meanDict };
    auxMeanDict[variable] = value;
    setMeanDict({ ...auxMeanDict });
  }

  function handleVariableDelete(variable) {
    const auxMeanDict = { ...meanDict };
    delete auxMeanDict[variable];

    const auxMeanExpressionArray = meanExpressionArray.filter(
      (item) => item !== variable
    );

    setMeanExpressionArray(auxMeanExpressionArray);
    setMeanDict({ ...auxMeanDict });
  }

  function prepareFormula() {
    let auxMeanExpressionArray = [];

    let begginingIndex = 0;
    let endingIndex = meanExpression.length;
    while (begginingIndex < meanExpression.length) {
      let foundCharacter = false;

      while (endingIndex > begginingIndex && !foundCharacter) {
        const character = meanExpression.substring(begginingIndex, endingIndex);
        if (
          operators.includes(character) ||
          Object.keys(meanDict).includes(character)
        ) {
          auxMeanExpressionArray.push(character);
          foundCharacter = true;
        } else if (!isNaN(character) && !isNaN(parseFloat(character))) {
          auxMeanExpressionArray.push(character);
          foundCharacter = true;
        } else {
          endingIndex--;
        }
      }
      if (begginingIndex == endingIndex) begginingIndex++;
      else begginingIndex = endingIndex;
      endingIndex = meanExpression.length;
    }

    setMeanExpressionArray([...auxMeanExpressionArray]);
  }

  useEffect(() => {
    prepareFormula();
  }, [meanExpression]);

  useEffect(() => {
    let params = {};

    if (type == "editMean") {
      params = {
        mean: meanExpressionArray.join(""),
        frequency: route.params.task.frequency || "",
        grade: {
          frequency: route.params.task.grade.frequency || {},
          mean: meanDict,
        },
      };
    } else if (type == "editFrequency") {
      params = {
        mean: route.params.task.mean || "",
        frequency: meanExpressionArray.join(""),
        grade: {
          frequency: meanDict,
          mean: route.params.task.grade.mean || {},
        },
      };
    }
    navigation.setOptions({
      headerTitle: type == "editMean" ? "Média" : "Frequência",
      headerRight: () => (
        <IconButton
          icon={"check"}
          disabled={!validExpression(meanExpressionArray.join(""))}
          size={24}
          color={colors.onHeaderInactive}
          onPress={() => {
            navigation.navigate({
              name: "Event",
              params: params,
              merge: true,
            });
          }}
        />
      ),
    });
  }, [meanExpressionArray, meanDict]);

  function handleFormulaAddition(str) {
    let auxMeanExpressionArray = [...meanExpressionArray];
    auxMeanExpressionArray.push(str);
    setMeanExpressionArray([...auxMeanExpressionArray]);
  }

  function handleFormulaDeletion() {
    let auxMeanExpressionArray = [...meanExpressionArray];
    auxMeanExpressionArray.pop();
    setMeanExpressionArray([...auxMeanExpressionArray]);
  }

  function handleValueAddition() {
    setIsDialogValueOpen(false);
    handleFormulaAddition(newValue);
    setNewValue("");
  }

  const validExpression = (text) => {
    try {
      magic(meanDict, text);
      return true;
    } catch (e) {
      return false;
    }
  };
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.surface1 },
      ]}
    >
      <View
        style={[
          styles.section,
          styles.card,
          styles.border,
          styles.center,
          { borderColor: colors.outline, backgroundColor: colors.surface },
        ]}
      >
        <Text style={{ ...styles.subtitle, color: colors.onSurface }}>
          {
            `${type == "editMean" ? "Média" : "Frequência"
            } atual`
          }</Text>
        {meanExpressionArray.join("") &&
          validExpression(meanExpressionArray.join(""))
          ? (
            <Text
              style={
                type == "editMean"
                  ? magic(meanDict, meanExpressionArray.join("")).result < 6
                    ? styles.meanInvalidValueText
                    : styles.meanValidValueText
                  : magic(meanDict, meanExpressionArray.join("")).result < 0.75
                    ? styles.meanInvalidValueText
                    : styles.meanValidValueText
              }
            >
              {(
                magic(meanDict, meanExpressionArray.join("")).result *
                (type == "editMean" ? 1 : 100)
              ).toFixed(2) + (type == "editMean" ? "" : "%")}
            </Text>
          ) : (
            <Text style={styles.meanInvalidValueText}> Expressão Inválida</Text>
          )
        }
      </View>

      <View style={styles.section}>
        <Text style={{ ...styles.subtitle, color: colors.onSurface }}>
          Fórmula da {type == "editMean" ? "média" : "frequência"}
        </Text>
        <View style={styles.sectionContent}>
          <View
            style={[
              styles.card,
              styles.row,
              { backgroundColor: colors.surface },
            ]}
          >
            {meanExpressionArray.map((character, index) => {
              if (Object.keys(meanDict).includes(character)) {
                return (
                  <KeyboardButton
                    key={index}
                    style={styles.variableButton}
                    textStyle={styles.variableButtonText}
                  >
                    {character}
                  </KeyboardButton>
                );
              } else {
                return (
                  <Text
                    key={index}
                    style={{ ...styles.operator, color: colors.onSurface }}
                  >
                    {character}
                  </Text>
                );
              }
            })}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ ...styles.subtitle, color: colors.onSurface }}>
          Operadores
        </Text>
        <View style={[styles.sectionContent, styles.row, { marginLeft: -8 }]}>
          {operators.map((operator, index) => (
            <View style={styles.buttonContainer} key={index}>
              <KeyboardButton onPress={() => handleFormulaAddition(operator)}>
                {operator}
              </KeyboardButton>
            </View>
          ))}
        </View>
        <View style={[styles.sectionContent, styles.row]}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.row,
              { borderColor: colors.outline, flex: 1, marginRight: 8 },
            ]}
            onPress={() => setIsDialogValueOpen(true)}
          >
            <Text style={[{ color: colors.primary, marginRight: 6 }]}>+</Text>
            <Text style={[{ color: colors.primary }]}>Valor</Text>
          </TouchableOpacity>
          <View style={{ flex: 3 }}>
            <KeyboardButton onPress={() => handleFormulaDeletion()}>
              <MaterialIcons
                name="backspace"
                size={24}
                color={colors.primary}
              />
            </KeyboardButton>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={{ ...styles.subtitle, color: colors.onSurface }}>
            Variáveis da {type == "editMean" ? "média" : "frequência"}
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              styles.row,
              styles.mlAuto,
              { borderColor: colors.outline },
            ]}
            onPress={() => setIsDialogVariableOpen(true)}
          >
            <Text style={[{ color: colors.primary, marginRight: 6 }]}>+</Text>
            <Text style={[{ color: colors.primary }]}>Variável</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContent}>
          {Object.keys(meanDict).map((key, index) => (
            <View style={[styles.row, { marginBottom: 20 }]} key={index}>
              <KeyboardButton
                style={styles.variableButton}
                textStyle={styles.variableButtonText}
                onPress={() => handleFormulaAddition(key)}
              >
                {key}
              </KeyboardButton>
              <TextInput
                keyboardType="numeric"
                value={meanDict[key].toString()}
                multiline={false}
                style={[styles.textInput, { backgroundColor: colors.surface }]}
                onChangeText={(text) => {
                  handleVariableChange(key, text);
                }}
              />
              <TouchableOpacity
                style={{
                  marginLeft: 2,
                  alignItems: "center",
                }}
                onPress={() => handleVariableDelete(key)}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={34}
                  color={colors.outline}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <Portal>
        <Dialog
          style={{ backgroundColor: colors.dialog }}
          visible={isDialogVariableOpen}
          onDismiss={() => setIsDialogVariableOpen(false)}
        >
          <Dialog.Title style={{ color: colors.onSurfaceVariant }}>
            Nova variável
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={{ ...styles.input, backgroundColor: colors.surface }}
              onChangeText={(text) => setNewVariableName(text)}
            ></TextInput>
            {newVariableName.length > 0 && operators.includes(newVariableName) && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginHorizontal: 10,
                  marginTop: -16,
                }}
              >
                Nome de variável inválido. Operadores não são permitidos.
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVariableOpen(false)}>
              Cancelar
            </Button>
            <Button
              onPress={() => handleVariableCreation()}
              disabled={
                newVariableName.length == 0 ||
                !isNaN(newVariableName) ||
                operators.includes(newVariableName)
              }
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          style={{ backgroundColor: colors.dialog }}
          visible={isDialogValueOpen}
        >
          <Dialog.Title style={{ color: colors.onSurfaceVariant }}>
            Adicionar valor
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={{ ...styles.input, backgroundColor: colors.surface }}
              onChangeText={(text) => setNewValue(text.replace(",", "."))}
              keyboardType="numeric"
            ></TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogValueOpen(false)}>
              Cancelar
            </Button>
            <Button
              disabled={
                newValue.search(
                  /^\$?\d+(((.\d{3})*(,\d*))|((,\d{3})*(\.\d*)))?$/
                ) < 0
              }
              onPress={() => handleValueAddition()}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

NewSubject.propTypes = PropTypes.any;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  section: {
    marginBottom: 24,
  },

  input: {
    height: 40,
    borderRadius: 5,
    marginBottom: 8,
  },

  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
  },

  sectionContent: {
    marginTop: 10,
  },

  card: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    minHeight: 55,
  },

  border: {
    borderWidth: 0.5,
  },

  center: {
    alignItems: "center",
  },

  meanValidValueText: {
    color: "#18BB59",
    fontSize: 28,
    marginTop: 10,
  },

  meanInvalidValueText: {
    color: "red",
    fontSize: 28,
    marginTop: 10,
  },

  buttonContainer: {
    marginLeft: 8,
    flex: 1,
  },

  operator: {
    fontSize: 20,
    paddingHorizontal: 5,
    lineHeight: 40,
  },

  textInput: {
    marginLeft: 8,
    flex: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    height: 40,
  },

  button: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
    justifyContent: "center",
  },

  mlAuto: {
    marginLeft: "auto",
  },

  variableButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 75,
    borderRadius: 50,
    marginVertical: 4,
  },

  variableButtonText: {
    fontSize: 15,
  },
});
