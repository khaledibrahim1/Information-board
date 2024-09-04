function updateValues(totalSales, totalSalesPercentage, siteVisits, siteVisitsPercentage, searches, searchesPercentage) {
    document.getElementById('total-sales').textContent = totalSales;
    document.getElementById('total-sales-percentage').textContent = totalSalesPercentage;
    document.getElementById('site-visits').textContent = siteVisits;
    document.getElementById('site-visits-percentage').textContent = siteVisitsPercentage;
    document.getElementById('searches').textContent = searches;
    document.getElementById('searches-percentage').textContent = searchesPercentage;
}

// Example data to update



// Call the function with the new data
updateValues(totalSales, totalSalesPercentage, siteVisits, siteVisitsPercentage, searches, searchesPercentage);