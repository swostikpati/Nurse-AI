import fs from "fs"
import csv from "csv-parser"

// Define patient IDs to search for
// const patientIds = [99991]; // Replace these with actual patient IDs

export const mimic_noteevents = (patientID) => {
    const results = [];
    const patientIds = [patientID];


    fs.createReadStream('mimic-iii/noteevents.csv')
    .pipe(csv())
    .on('data', (data) => {
        // Check if the current row's subject_id is in our list of patient IDs
        if (patientIds.includes(parseInt(data.subject_id))) {
        // Push the necessary data to results array
        results.push({
            subject_id: data.subject_id,
            text: data.text
        });
        }
    })
    .on('end', () => {
        // All rows are read and data is parsed, so output results
        console.log(results);
        return results;
    });
}

export const mimic_diagnosis = (patientID) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const patientIds = [patientID];

        fs.createReadStream('mimic-iii/id_diagnosis.csv')
        .pipe(csv())
        .on('data', (data) => {
        // Check if the current row's subject_id is in our list of patient IDs
        if (patientIds.includes(parseInt(data.subject_id))) {
            // Push the necessary data to results array
            results.push({
            subject_id: data.subject_id,
            short_title: data.short_title,
            long_title: data.long_title
            });
        }
        })
        .on('end', () => {
            // All rows are read and data is parsed, so output results
            console.log(results);
            resolve(results);
        })
        .on('error', (error) => {
            reject('Error reading the CSV file:', error);
        });
    })
}

export const mimic_admissions = (patientID) => {
    const results = [];
    const patientIds = [patientID];

    fs.createReadStream('mimic-iii/admissions.csv')
    .pipe(csv())
    .on('data', (data) => {
    // Check if the current row's subject_id is in our list of patient IDs
    if (patientIds.includes(parseInt(data.subject_id))) {
        // Push the necessary data to results array
        results.push({
        subject_id: data.subject_id,
        admission_type: data.admission_type,
        diagnosis: data.diagnosis
        });
    }
    })
    .on('end', () => {
    // All rows are read and data is parsed, so output results
        console.log(results);
        return results;
    });
}

export const mimic_chartevents = (patientID) => {
    const results = [];
    const patientIds = [patientID];

    fs.createReadStream('mimic-iii/chartevents.csv')
    .pipe(csv())
    .on('data', (data) => {
    // Check if the current row's subject_id is in our list of patient IDs
    if (patientIds.includes(parseInt(data.subject_id))) {
        // Push the necessary data to results array
        results.push({
        subject_id: data.subject_id,
        charttime: data.charttime,
        value: data.value
        });
    }
    })
    .on('end', () => {
    // All rows are read and data is parsed, so output results
        console.log(results);
        return results;
    });
}

export const mimic_labevents = (patientID) => {
    const results = [];
    const patientIds = [patientID];

    fs.createReadStream('mimic-iii/labevents.csv')
    .pipe(csv())
    .on('data', (data) => {
    // Check if the current row's subject_id is in our list of patient IDs
    if (patientIds.includes(parseInt(data.subject_id))) {
        // Push the necessary data to results array
        results.push({
        subject_id: data.subject_id,
        label: data.label,
        fluid: data.fluid,
        category: data.category
        });
    }
    })
    .on('end', () => {
    // All rows are read and data is parsed, so output results
        console.log(results);
        return results;
    });
}

export const mimic_microbiologyevents = (patientID) => {
    const results = [];
    const patientIds = [patientID];


    fs.createReadStream('mimic-iii/microbiologyevents.csv')
    .pipe(csv())
    .on('data', (data) => {
    // Check if the current row's subject_id is in our list of patient IDs
    if (patientIds.includes(parseInt(data.subject_id))) {
        // Push the necessary data to results array

        results.push({
        subject_id: data.subject_id,
        spec_type_desc: data.spec_type_desc,
        org_name: data.org_name
        });
    }
    })
    .on('end', () => {
    // All rows are read and data is parsed, so output results
        console.log(results);
        return results;
    });
}

export const mimic_prescriptions = (patientID) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const patientIds = [patientID];

        fs.createReadStream('mimic-iii/prescriptions.csv')
        .pipe(csv())
        .on('data', (data) => {
        // Check if the current row's subject_id is in our list of patient IDs
        if (patientIds.includes(parseInt(data.subject_id))) {
            // Push the necessary data to results array

            results.push({
            subject_id: data.subject_id,
            drug_type: data.drug_type,
            drug: data.drug,
            drug_name_poe: data.drug_name_poe,
            drug_name_generic: data.drug_name_generic,
            prod_strength: data.prod_strength,
            dose_val_rx: data.dose_val_rx,
            dose_unit_rx: data.dose_unit_rx,
            route: data.route

            });
        }
        })
        .on('end', () => {
        // All rows are read and data is parsed, so output results
            console.log(results);
            resolve(results);
        })
        .on('error', (error) => {
            reject('Error reading the CSV file:', error);
        });
    })
}

export const mimic_patient_id = () => {
    return new Promise((resolve, reject) => {
        const patientIds = new Set(); // Using a Set to store unique patient IDs

        fs.createReadStream('mimic-iii/patients.csv')
        .pipe(csv())
        .on('data', (data) => {
            patientIds.add(data.subject_id); // Assuming 'subject_id' is the column name for patient IDs
        })
        .on('end', () => {
            // console.log('All patient IDs:', Array.from(patientIds));
            resolve(Array.from(patientIds));
        })
        .on('error', (error) => {
            reject('Error reading the CSV file:', error);
        });
    })
}

