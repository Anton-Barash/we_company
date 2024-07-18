


// Создаем компонент и прописываем propTypes
function CreatNewCompany() {

    // Функция для обработки отправки формы
    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        const formData = new FormData(e.target); // Получаем данные из формы
        const company = {
            company_name: formData.get('company_name'),
            description: formData.get('description')
        };
        console.log(company); // Просто для примера, можно использовать объект company по вашему усмотрению
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="company_name">Название компании:</label>
                <input type="text" id="company_name" name="company_name" />

                <label htmlFor="description">Описание:</label>
                <textarea id="description" name="description"></textarea>

                <input type="submit" value="Отправить" />
            </form>
        </div>
    )
}

CreatNewCompany.propTypes = {
    // PropTypes, если необходимо
};

export default CreatNewCompany;
