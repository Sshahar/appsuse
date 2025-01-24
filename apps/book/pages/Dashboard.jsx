import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { bookService } from "../services/book.service.js"
const { Link } = ReactRouterDOM

const { useState, useEffect, useRef } = React

export function Dashboard() {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        loadCategories()

        return () => { }
    }, [])

    useEffectUpdate(() => {
        renderChart()
    }, [categories])

    function loadCategories() {
        bookService.getCategoryCount()
            .then(setCategories)
            .catch(err => {
                console.log('Problem getting books:', err)
            })
    }

    function renderChart() {
        const data = categories
        Chart.defaults.backgroundColor = '#9BD0F5';
        // Chart.defaults.borderColor = '#36A2EB';
        Chart.defaults.color = '#000';

        new Chart(
            document.getElementById('category-chart'),
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.category),
                    datasets: [
                        {
                            label: 'Books by category',
                            data: data.map(row => row.count)
                        }
                    ]
                }
            }
        )
    }

    const chartStyle = { "width": "800px" }
    return (
        <div className="book-dashboard">
            <h2>Hello from Dashboard</h2>
            <Link to="/book" className='btn'>Back</Link>
            <div style={chartStyle}><canvas id="category-chart"></canvas></div>
        </div>
    )
}