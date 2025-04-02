import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Définition des styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    backgroundColor: "#f7f7f7", // Fond léger pour l'esthétique
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  contact: {
    textAlign: "right",
    fontSize: 10,
  },
  section: {
    marginBottom: 20, // Espacement augmenté pour une meilleure séparation
    fontSize: 12,
  },
  sectionText: {
    marginBottom: 6, // Espacement entre chaque ligne d'information
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden", // Pour un effet arrondi propre
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
    padding: 10,
  },
  headerCell: {
    padding: 8,
    flex: 1,
    textAlign: "center",
    backgroundColor: "#f2f2f2", // Couleur différente pour l'en-tête
    fontWeight: "bold",
  },
  cell: {
    padding: 8,
    flex: 1,
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    borderTopWidth: 2,
    borderColor: "#dcdcdc",
  },
  totalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D79B25",
  },
  slogan: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    fontStyle: "italic",
    color: "#888",
  },
});

// Composant Invoice
const Invoice = ({ invoice }: { invoice: any }) => {
  const total = invoice.price; // En cas de calcul supplémentaire (taxes, remises, etc.), tu peux ajouter ici

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête avec logo et contact */}
        <View style={styles.header}>
          <Image src="/Kozua v3.png" style={styles.logo} />
          <View style={styles.contact}>
            <Text>+33 6 12 34 56 78</Text>
            <Text>gloireondongo1205@gmail.com</Text>
          </View>
        </View>

        {/* Informations client avec espacement amélioré */}
        <View style={styles.section}>
          <Text style={styles.sectionText}>Facture #: {invoice.id}</Text>
          <Text style={styles.sectionText}>Date: {new Date(invoice.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.sectionText}>Client: {invoice.customerName}</Text>
          <Text style={styles.sectionText}>Email: {invoice.customerEmail}</Text>
          <Text style={styles.sectionText}>Téléphone: {invoice.customerPhone}</Text>
        </View>

        {/* Détails de la réservation */}
        <View style={styles.table}>
          {/* En-tête de la table */}
          <View style={styles.row}>
            <Text style={styles.headerCell}>Réservation</Text>
            <Text style={styles.headerCell}>Date de début de réservation</Text>
            <Text style={styles.headerCell}>Date de fin de réservation</Text>
            <Text style={styles.headerCell}>Prix</Text>
            <Text style={styles.headerCell}>Type</Text>
          </View>
          {/* Ligne de données */}
          <View style={styles.row}>
            <Text style={styles.cell}>{invoice.name}</Text>
            <Text style={styles.cell}>
              {invoice.startDate ? new Date(invoice.startDate).toLocaleDateString() : "-"}
            </Text>
            <Text style={styles.cell}>
              {invoice.endDate ? new Date(invoice.endDate).toLocaleDateString() : "-"}
            </Text>
            <Text style={styles.cell}>{invoice.price} cfa</Text>
            <Text style={styles.cell}>{invoice.reservationType}</Text>
          </View>
        </View>

        {/* Total de la facture */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total: {total} cfa</Text>
        </View>

        {/* Slogan en bas */}
        <Text style={styles.slogan}>
          Avec Kozua, trouvez, réservez ou achetez !
        </Text>
      </Page>
    </Document>
  );
};

export default Invoice;
