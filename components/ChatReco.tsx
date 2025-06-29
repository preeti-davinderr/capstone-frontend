// // import React, { useState } from 'react';
// // import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

// // export default function HealthRecoAI() {
// //   const [bp, setBp] = useState('');
// //   const [weight, setWeight] = useState('');
// //   const [steps, setSteps] = useState('');
// //   const [sleep, setSleep] = useState('');
// //   const [advice, setAdvice] = useState('');
// //   const [loading, setLoading] = useState(false);
// // console.log('HealthRecoAI Component Rendered');
// // // console.log('bp:', bp, 'weight:', weight, 'steps:', steps, 'sleep:', sleep);
// //   const getAdvice = async () => {
// //     setLoading(true);
// //     const prompt = `Give simple health, diet, and exercise advice for a pregnant woman with blood pressure ${bp}, weight ${weight}kg, steps ${steps}, and sleep ${sleep} hours.`;
// //     console.log('Prompt:', prompt);
// //     const response = await fetch('', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': 'Bearer ',
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ inputs: prompt }),
// //       });

// //       const data = await response.json();
// //       console.log('HuggingFace Response:', data);
// //     if (data && data[0]?.generated_text) {
// //       setAdvice(data[0].generated_text);
// //     } else {
// //       setAdvice('Sorry, no advice available.');
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.label}>Blood Pressure</Text>
// //       <TextInput style={styles.input} value={bp} onChangeText={setBp} placeholder="e.g., 130/85" />

// //       <Text style={styles.label}>Weight (kg)</Text>
// //       <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />

// //       <Text style={styles.label}>Steps</Text>
// //       <TextInput style={styles.input} value={steps} onChangeText={setSteps} keyboardType="numeric" />

// //       <Text style={styles.label}>Sleep (hours)</Text>
// //       <TextInput style={styles.input} value={sleep} onChangeText={setSleep} keyboardType="numeric" />

// //       <Button title="Get Free AI Advice" onPress={getAdvice} disabled={loading} />

// //       <Text style={styles.advice}>{loading ? 'Thinking...' : advice}</Text>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //       padding: 20,
// //       backgroundColor: '#000',
// //       minHeight: '100%',
// //     },
// //     label: {
// //       marginTop: 15,
// //       fontWeight: 'bold',
// //       color: '#fff',
// //       fontSize: 16,
// //     },
// //     input: {
// //       borderWidth: 1,
// //       borderColor: '#444',
// //       padding: 10,
// //       marginTop: 5,
// //       borderRadius: 5,
// //       color: '#fff',
// //       backgroundColor: '#111',
// //     },
// //     button: {
// //       marginTop: 20,
// //       backgroundColor: '#444',
// //       borderRadius: 5,
// //       overflow: 'hidden',
// //     },
// //     advice: {
// //       marginTop: 20,
// //       fontSize: 16,
// //       color: '#fff',
// //       lineHeight: 22,
// //     },
// //   });

// import Constants from 'expo-constants';
// import React, { useState } from 'react';
// import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
// // const API_KEY = Constants.expoConfig?.extra?.HRECO;
// export default function HealthRecoAI() {
//   const [bp, setBp] = useState('');
//   const [weight, setWeight] = useState('');
//   const [steps, setSteps] = useState('');
//   const [sleep, setSleep] = useState('');
//   const [advice, setAdvice] = useState('');
//   const [loading, setLoading] = useState(false);

//   const API_KEY = "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";
// console.log('HealthRecoAI Component Rendered');
// console.log(API_KEY)
//   const getAdvice = async () => {
//     setLoading(true);
//     setAdvice('');
//     // const prompt = `Blood pressure ${bp}, weight ${weight}kg, steps ${steps}, sleep ${sleep}h. Provide pregnancy health advice.`;
//     const prompt = `I am pregnant. My blood pressure is ${bp}, weight is ${weight}kg, I walk ${steps} steps daily, and I sleep ${sleep} hours a night. Can you give me pregnancy-specific diet and exercise recommendations?`;

//     try {
//       const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer `,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'openai/gpt-3.5-turbo',
//           messages: [
//             { role: 'system', content: 'You are a pregnancy health assistant.' },
//             { role: 'user', content: prompt },
//           ],
//         }),
//       });
//       const json = await res.json();
//       if (res.ok) {
//         setAdvice(json.choices[0].message.content);
//       } else {
//         setAdvice(`Error ${res.status}: ${json.error?.message || 'Unknown error'}`);
//       }
//     } catch (e) {
//       setAdvice('Network error.');
//     }

//     setLoading(false);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* <TextInput style={styles.input} placeholder="130/85" placeholderTextColor="#aaa" value={bp} onChangeText={setBp} />
//       <TextInput style={styles.input} placeholder="70" keyboardType="numeric" placeholderTextColor="#aaa" value={weight} onChangeText={setWeight} />
//       <TextInput style={styles.input} placeholder="4000" keyboardType="numeric" placeholderTextColor="#aaa" value={steps} onChangeText={setSteps} />
//       <TextInput style={styles.input} placeholder="6" keyboardType="numeric" placeholderTextColor="#aaa" value={sleep} onChangeText={setSleep} /> */}
//       <Button title={loading ? 'Thinking...' : 'Get Advice'} onPress={getAdvice} disabled={loading} />
//       <Text style={styles.advice}>{advice}</Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, backgroundColor: '#000', minHeight: '100%' },
//   input: { backgroundColor: '#111', color: '#fff', borderColor: '#444', borderWidth: 1, marginTop: 15, padding: 10, borderRadius: 5 },
//   advice: { color: '#fff', marginTop: 20, fontSize: 16 }
// });

import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text } from "react-native";

type Props = {
  bpReading: {
    systolic: string;
    diastolic: string;
    status: string;
  } | null;
  weightReading: {
    value: string;
    unit: "kg" | "lbs";
    date: string;
  } | null;
};

export default function HealthRecoAI({ bpReading, weightReading }: Props) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY =
    "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"; // <--- Update with your actual key if needed

  const getAdvice = async () => {
    setLoading(true);
    setAdvice("");

    const bp = bpReading
      ? `${bpReading.systolic}/${bpReading.diastolic}`
      : "unknown";
    const weight = weightReading ? `${weightReading.value}` : "unknown";

    const prompt = `I am pregnant. My blood pressure is ${bp}, weight is ${weight}kg. Can you give me pregnancy-specific diet and exercise recommendations?`;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //   model: 'openai/gpt-3.5-turbo',
          model: "openrouter/auto",
          messages: [
            {
              role: "system",
              content: "You are a pregnancy health assistant.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 512,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setAdvice(json.choices[0].message.content);
      } else {
        setAdvice(
          `Error ${res.status}: ${json.error?.message || "Unknown error"}`
        );
      }
    } catch (e) {
      setAdvice("Network error.");
    }

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Button
        title={loading ? "Thinking..." : "Get Advice"}
        onPress={getAdvice}
        disabled={loading}
      />
      <Text style={styles.advice}>{advice}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#000", minHeight: "100%" },
  advice: { color: "#fff", marginTop: 20, fontSize: 16 },
});
