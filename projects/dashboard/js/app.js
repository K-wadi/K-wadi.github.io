document.addEventListener('DOMContentLoaded', () => {
    initializeStats();
    initializeCharts();
    displayRecentOrders();
});

function initializeStats() {
    // Update stats cards
    document.getElementById('total-sales').textContent = formatCurrency(dashboardData.stats.totalSales);
    document.getElementById('sales-trend').textContent = `${dashboardData.stats.salesTrend > 0 ? '+' : ''}${dashboardData.stats.salesTrend}%`;
    
    document.getElementById('total-orders').textContent = dashboardData.stats.totalOrders.toLocaleString();
    document.getElementById('orders-trend').textContent = `${dashboardData.stats.ordersTrend > 0 ? '+' : ''}${dashboardData.stats.ordersTrend}%`;
    
    document.getElementById('total-customers').textContent = dashboardData.stats.totalCustomers.toLocaleString();
    document.getElementById('customers-trend').textContent = `${dashboardData.stats.customersTrend > 0 ? '+' : ''}${dashboardData.stats.customersTrend}%`;
    
    document.getElementById('avg-order').textContent = formatCurrency(dashboardData.stats.avgOrder);
    document.getElementById('avg-order-trend').textContent = `${dashboardData.stats.avgOrderTrend > 0 ? '+' : ''}${dashboardData.stats.avgOrderTrend}%`;
}

function initializeCharts() {
    // Sales Overview Chart
    const salesChartOptions = {
        series: [{
            name: 'Sales',
            data: dashboardData.salesData.map(item => item.sales)
        }],
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: dashboardData.salesData.map(item => item.month)
        },
        yaxis: {
            labels: {
                formatter: function(value) {
                    return formatCurrency(value);
                }
            }
        },
        tooltip: {
            y: {
                formatter: function(value) {
                    return formatCurrency(value);
                }
            }
        },
        colors: ['#4e73df']
    };

    const salesChart = new ApexCharts(document.querySelector("#sales-chart"), salesChartOptions);
    salesChart.render();

    // Category Chart
    const categoryChartOptions = {
        series: dashboardData.categoryData.map(item => item.sales),
        chart: {
            type: 'donut',
            height: 350
        },
        labels: dashboardData.categoryData.map(item => item.category),
        colors: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
        tooltip: {
            y: {
                formatter: function(value) {
                    return formatCurrency(value);
                }
            }
        }
    };

    const categoryChart = new ApexCharts(document.querySelector("#category-chart"), categoryChartOptions);
    categoryChart.render();
}

function displayRecentOrders() {
    const tbody = document.getElementById('recent-orders');
    tbody.innerHTML = '';

    dashboardData.recentOrders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${formatCurrency(order.amount)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
} 