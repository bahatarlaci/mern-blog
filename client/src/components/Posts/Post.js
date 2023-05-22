export default function Post() {
    return (
        <div className='post'>
        <div className='image'>
          <img src='https://techcrunch.com/wp-content/uploads/2023/05/348323714_3067966283510566_1240498857289601111_n.jpeg?w=730&crop=1' alt='placeholder' />
        </div>
        <div className='texts'>
          <h2>WhatsApp now lets you edit messages with a</h2>
          <p className='info'>
            <a href='/' className='author'>Baha Tarlacı</a> 
            <time>2023-05-22 18:00</time>
          </p>
          <p className='summary'>Mark Zuckerberg noted in a Facebook post that users can now modify a message within 15 minutes of sending the message. If you want to do so, you can press and hold on a message</p>
        </div>
      </div>
    )
}